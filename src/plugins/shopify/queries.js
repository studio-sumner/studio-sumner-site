import groq from 'groq';

export const price = groq`{
	amount,
	currencyCode,
}`;

export const productImage = groq`{
	_key,
	_type,
	src,
	alt,
	height,
	width,
	admin_graphql_api_id,
	product_id,
	variant_ids,
}`;

export const productVariant = groq`{
	_key,
	_id,
	productTitle,
	variantTitle,
	variantId,
	productId,
	sku,
	cents,
	price ${price},
	compareAtCents,
	inventoryQuantity,
	option1,
	option2,
	option3,
	image ${productImage},
	sellingPlanOptions[] {
		_key,
		priceAdjustments[] {
			_key,
			price ${price},
			compareAtPrice ${price},
			perDeliveryPrice ${price},
		},
		sellingPlan {
			id,
			name,
			description,
			recurringDeliveries,
			options[] {
				_key,
				name,
				value,
			},
		},
	}
}`;

export const product = groq`{
	_key,
	_id,
	title,
	'slug': slug.current,
	createdAt,
	deleted,
	productId,
	tags[],
	cents,
	options[] {
		_key,
		name,
		position,
		values[] {
			_key,
			name,
		},
	},
	variants[]-> ${productVariant},
	image ${productImage},
	images[] ${productImage},
	requiresSellingPlan,
}`;
