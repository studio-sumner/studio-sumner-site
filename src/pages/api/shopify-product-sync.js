import {createClient} from '@sanity/client';
import crypto from 'crypto';
import {buffer} from 'micro';
import find from 'lodash/find';
import {encode, decode} from '../../utils/shopifyGid';
import Shopify from '../../plugins/shopify/api/shopifyStorefront';

// Disable body parser for this request to validate webhook
export const config = {
	api: {
		bodyParser: false,
	},
};

const client = createClient({
	projectId: process.env.SANITY_PROJECT_ID,
	dataset: process.env.SANITY_DATASET,
	token: process.env.SANITY_API_TOKEN,
	apiVersion: process.env.SANITY_API_VERSION,
	useCdn: false,
});

export const shopifyImageToProductImage = shopifyImage => ({
	_key: `product-image-${shopifyImage.id}`,
	src: shopifyImage.src,
	alt: shopifyImage.alt,
	height: shopifyImage.height,
	width: shopifyImage.width,
	admin_graphql_api_id: shopifyImage.admin_graphql_api_id,
	product_id: shopifyImage.product_id,
	variant_ids: shopifyImage.variant_ids,
});

export default async (req, res) => {
	const rawBody = (await buffer(req)).toString();

	// Allow preflight
	if (req.method !== 'POST' || !rawBody) {
		return res.status(200).end();
	}

	const hmac = req.headers['x-shopify-hmac-sha256'];

	try {
		const generatedHash = await crypto
			.createHmac('sha256', process.env.SHOPIFY_WEBHOOK_SIGNATURE)
			.update(rawBody)
			.digest('base64');

		if (generatedHash !== hmac) {
			console.log('Shopify hash is incorrect.');

			// Allow shopify to keep webhook
			return res.status(200).json({error: 'Invalid webhook'});
		}
	} catch (error) {
		console.log('Error decrypting Shopify hash.');
		console.log(error);

		// Allow shopify to keep webhook
		return res.status(200).json({error: 'Invalid webhook'});
	}

	let data;

	try {
		data = JSON.parse(rawBody);
	} catch (error) {
		console.log('JSON parsing error:', error);

		// Allow shopify to keep webhook
		return res.status(200).json({error: 'Bad request body'});
	}

	//
	// === Product Deletion ===
	//

	if (data.id && !data.title && !data.handle) {
		try {
			const product = {
				_type: 'product',
				_id: data.id.toString(),
				deleted: true,
			};

			let tx = client.transaction();

			tx = tx.createIfNotExists(product);
			tx = tx.patch(product._id, p => p.set(product));

			const result = await tx.commit();

			return res.status(200).json(result);
		} catch (error) {
			console.log(error);

			// Allow shopify to keep webhook
			return res
				.status(200)
				.json({error: 'An internal server error has occured'});
		}
	}

	//
	// === Create/Update Product ===
	//

	try {
		// === Fetch Selling Plans ===
		//
		const shopifyId = encode('Product', data.id.toString(), {
			accessToken:
				process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
		});
		const shopifyProduct = await Shopify.fetchProduct(shopifyId);

		//
		// === Build Structures ===
		//

		const product = {
			_type: 'product',
			_id: data.id.toString(),
			productId: data.id,
			title: data.title,
			slug: {
				_type: 'slug',
				current: data.handle,
			},
			createdAt: data.created_at,
			cents: Number(data.variants[0].price) * 100,
			compareAtCents: data.variants[0].compare_at_price
				? Number(data.variants[0].compare_at_price) * 100
				: null,
			tags: data.tags ? data.tags.split(', ') : null,
			options: data.options.map(({id, name, position, values}) => ({
				_id: id.toString(),
				_key: id.toString(),
				_type: 'productVariantOption',
				name,
				position,
				values: values.map(value => ({
					_id: value,
					_key: value,
					_type: 'productVariantOptionValue',
					name: value,
				})),
				requiresSellingPlan: shopifyProduct
					? shopifyProduct.requiresSellingPlan
					: null,
			})),
			image: data.image ? shopifyImageToProductImage(data.image) : null,
			images: data.images
				? data.images.map(shopifyImageToProductImage)
				: [],
		};

		//
		// === Patch Product ===
		//

		let tx = client.transaction();

		tx = tx.createIfNotExists(product);
		tx = tx.patch(product._id, p => p.set(product));

		if (!product.compareAtCents) {
			tx = tx.patch(product._id, p => p.unset(['compareAtCents']));
		}

		if (!product.tags) {
			tx = tx.patch(product._id, p => p.unset(['tags']));
		}

		if (!product.image) {
			tx = tx.patch(product._id, p => p.unset(['image']));
		}

		if (!product.images || !product.images.length) {
			tx = tx.patch(product._id, p => p.unset(['images']));
		}

		console.log(`Updating/patching Product ${data.id} in Sanity`);

		//
		// === Patch Variants ===
		//

		const productVariants = data.variants.map(variant => {
			const image = find(data.images, {id: variant.image_id});

			let shopifyVariant;
			let sellingPlanOptions = [];

			if (shopifyProduct) {
				shopifyVariant = find(
					shopifyProduct.variants,
					shopifyVariant =>
						decode(shopifyVariant.id).id === variant.id.toString(),
				);
			}

			const hasSellingPlan = Boolean(
				shopifyVariant &&
					shopifyVariant.sellingPlanAllocations &&
					shopifyVariant.sellingPlanAllocations.length,
			);

			if (hasSellingPlan) {
				sellingPlanOptions = shopifyVariant.sellingPlanAllocations.map(
					(option, index) => {
						return {
							...option,
							priceAdjustments: option.priceAdjustments.map(
								(adjustment, index) => ({
									...adjustment,
									_key: `price-adjustment-${index}`,
								}),
							),
							_key: `selling-plan-option-${index}`,
							sellingPlan: {
								...option.sellingPlan,
								options: option.sellingPlan.options.map(
									(option, index) => ({
										...option,
										_key: `selling-plan-option-${index}`,
									}),
								),
							},
						};
					},
				);
			}
			return {
				_type: 'productVariant',
				_id: variant.id.toString(),
				productId: data.id,
				variantId: variant.id,
				productTitle: data.title,
				variantTitle: variant.title,
				sku: variant.sku,
				price: shopifyVariant ? shopifyVariant.price : null,
				cents: Number(variant.price) * 100,
				compareAtCents: variant.compare_at_price
					? Number(variant.compare_at_price) * 100
					: null,
				option1: variant.option1 ? variant.option1 : null,
				option2: variant.option2 ? variant.option2 : null,
				option3: variant.option3 ? variant.option3 : null,
				inventoryQuantity: variant.inventory_quantity,
				image: image ? shopifyImageToProductImage(image) : null,
				sellingPlanOptions,
			};
		});

		// Create Variant
		productVariants.forEach(variant => {
			tx = tx.createIfNotExists(variant);
			tx = tx.patch(variant._id, p => p.set(variant));

			if (!variant.compareAtCents) {
				tx = tx.patch(variant._id, p => p.unset(['compareAtCents']));
			}

			if (!variant.price) {
				tx = tx.patch(variant._id, p => p.unset(['price']));
			}

			if (!variant.option1) {
				tx = tx.patch(variant._id, p => p.unset(['option1']));
			}

			if (!variant.option2) {
				tx = tx.patch(variant._id, p => p.unset(['option2']));
			}

			if (!variant.option3) {
				tx = tx.patch(variant._id, p => p.unset(['option3']));
			}

			if (!variant.sellingPlanOptions) {
				tx = tx.patch(variant._id, p =>
					p.unset(['sellingPlanOptions']),
				);
			}
		});

		console.log(
			`Updating/patching Variants ${data.variants
				.map(v => v.id)
				.join(', ')} in Sanity`,
		);

		//
		// === Include variants on product document ===
		//

		tx = tx.patch(product._id, p =>
			p.set({
				variants: data.variants.map(variant => ({
					_type: 'reference',
					_ref: variant.id.toString(),
					_key: variant.id.toString(),
				})),
			}),
		);

		console.log(`Adding variant references to ${data.id} in Sanity`);

		const result = await tx.commit();

		return res.status(200).json(result);
	} catch (error) {
		console.log(error);

		return res
			.status(200)
			.json({error: 'An internal server error has occured'});
	}
};
