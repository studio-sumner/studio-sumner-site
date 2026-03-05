require('../utils/dot-env');

const sade = require('sade');
const {createClient} = require('@sanity/client');
const fs = require('fs');
const path = require('path');

const client = createClient({
	projectId: process.env.SANITY_PROJECT_ID,
	dataset: process.env.SANITY_DATASET,
	token: process.env.SANITY_API_TOKEN,
	apiVersion: process.env.SANITY_API_VERSION,
	useCdn: false,
});

const prog = sade('sprout');

prog.version('1.0.0');

const initializeDataset = async dataset => {
	console.log(`Initializing ${dataset} dataset with default values`);

	// Uploading images to sanity
	console.log('Uploading images to sanity');

	const tshirtPath = path.join(__dirname, 'assets', 'tshirt.jpg');
	const heroPath = path.join(__dirname, 'assets', 'hero.jpg');
	const seoPath = path.join(__dirname, 'assets', 'og.png');

	const [tshirtImageBuffer, heroImageBuffer, seoImageBuffer] =
		await Promise.all([
			fs.promises.readFile(tshirtPath),
			fs.promises.readFile(heroPath),
			fs.promises.readFile(seoPath),
		]);

	const [tshirtAsset, heroAsset, seoAsset] = await Promise.all([
		client.assets.upload('image', tshirtImageBuffer),
		client.assets.upload('image', heroImageBuffer),
		client.assets.upload('image', seoImageBuffer),
	]);

	// Create initial pages
	console.log('Creating initial pages');

	const [promoBanner, cart, notFoundPage, tShirtProduct, termsPage] =
		await Promise.all([
			client.create({
				_type: 'promoBanner',
				title: 'Promo Banner',
				description: [
					{
						_key: 'promoBannerBlock',
						_type: 'block',
						children: [
							{
								_key: 'promoBannerSpan',
								_type: 'span',
								marks: [],
								text: 'Free shipping on orders over $100',
							},
						],
						markDefs: [],
						style: 'normal',
					},
				],
			}),

			client.create({
				_type: 'cart',
				title: 'Cart',
				drawerTitle: 'Cart',
				emptyStateTitle: 'Your cart is empty',
				emptyStateCta: [
					{
						_type: 'link',
						_key: 'emptyStateCta',
						title: 'Shop Now',
						url: '/',
					},
				],
			}),

			client.create({
				_type: 'notFound',
				title: '404',
			}),

			client.create({
				_type: 'productLanding',
				title: 'Sprout T-Shirt',
				slug: {
					current: 'sprout-t-shirt',
				},
				mainImage: {
					_type: 'image',
					asset: {
						_type: 'reference',
						_ref: tshirtAsset._id,
					},
				},
				description: [
					{
						_key: 'descriptionBlock',
						_type: 'block',
						children: [
							{
								_key: 'descriptionSpan',
								_type: 'span',
								marks: [],
								text: 'Id ullamco aliqua tempor voluptate laborum sint laborum commodo dolore. Esse nostrud deserunt elit ad in reprehenderit.',
							},
						],
						markDefs: [],
						style: 'normal',
					},
				],
			}),

			client.create({
				_type: 'page',
				title: 'Terms of Service',
				slug: {
					current: 'terms',
				},
				components: [
					{
						_key: 'pageRichText',
						_type: 'pageRichText',
						title: 'Terms of Service',
						description: [
							{
								_key: 'block-1',
								_type: 'block',
								children: [
									{
										_key: 'descriptionSpan',
										_type: 'span',
										marks: [],
										text: 'Enim reprehenderit mollit enim voluptate incididunt eu mollit consequat eu ea est enim elit amet labore. Aliquip ut sunt esse esse. Culpa sit adipisicing aliqua sint laboris eu cupidatat labore sunt ea cillum pariatur deserunt eu aute. Proident ullamco officia nisi officia occaecat qui laboris sunt quis.',
									},
								],
								markDefs: [],
								style: 'normal',
							},
							{
								_key: 'block-2',
								_type: 'block',
								children: [
									{
										_key: 'descriptionSpan',
										_type: 'span',
										marks: [],
										text: 'Enim reprehenderit mollit enim voluptate incididunt eu mollit consequat eu ea est enim elit amet labore. Aliquip ut sunt esse esse. Culpa sit adipisicing aliqua sint laboris eu cupidatat labore sunt ea cillum pariatur deserunt eu aute. Proident ullamco officia nisi officia occaecat qui laboris sunt quis.',
									},
								],
								markDefs: [],
								style: 'normal',
							},
							{
								_key: 'block-3',
								_type: 'block',
								children: [
									{
										_key: 'descriptionSpan',
										_type: 'span',
										marks: [],
										text: 'Enim reprehenderit mollit enim voluptate incididunt eu mollit consequat eu ea est enim elit amet labore. Aliquip ut sunt esse esse. Culpa sit adipisicing aliqua sint laboris eu cupidatat labore sunt ea cillum pariatur deserunt eu aute. Proident ullamco officia nisi officia occaecat qui laboris sunt quis.',
									},
								],
								markDefs: [],
								style: 'normal',
							},
						],
					},
				],
			}),
		]);

	// Add products to merch collection
	console.log('Adding products to merch collection');

	const merchCollection = await client.create({
		_type: 'collection',
		title: 'Merch',
		slug: {
			current: 'merch',
		},
		products: [
			{
				_type: 'reference',
				_key: `${tShirtProduct._id}-1`,
				_ref: tShirtProduct._id,
			},
			{
				_type: 'reference',
				_key: `${tShirtProduct._id}-2`,
				_ref: tShirtProduct._id,
			},
			{
				_type: 'reference',
				_key: `${tShirtProduct._id}-3`,
				_ref: tShirtProduct._id,
			},
			{
				_type: 'reference',
				_key: `${tShirtProduct._id}-4`,
				_ref: tShirtProduct._id,
			},
		],
	});

	// Create modular homepage
	console.log('Creating modular homepage');

	const homepage = await client.create({
		_type: 'page',
		title: 'Homepage',
		slug: {
			current: 'homepage',
		},
		components: [
			{
				_key: 'hero',
				_type: 'fullWidthHeroCarousel',
				slides: [
					{
						_key: 'heroSlide1',
						_type: 'slide',
						subtitle: 'New',
						title: 'Sprout Launch Collection',
						cta: [
							{
								_key: 'heroCta1',
								_type: 'productLink',
								productLanding: {
									_ref: tShirtProduct._id,
									_type: 'reference',
								},
								title: 'Shop',
							},
						],
						background: [
							{
								_key: 'heroBackground1',
								_type: 'backgroundImage',
								image: {
									_type: 'image',
									asset: {
										_type: 'reference',
										_ref: heroAsset._id,
									},
								},
							},
						],
					},

					{
						_key: 'heroSlide2',
						_type: 'slide',
						subtitle: 'New',
						title: 'Slide Number Two',
						cta: [
							{
								_key: 'heroCta1',
								_type: 'productLink',
								productLanding: {
									_ref: tShirtProduct._id,
									_type: 'reference',
								},
								title: 'Shop',
							},
						],
						background: [
							{
								_key: 'heroBackground1',
								_type: 'backgroundImage',
								image: {
									_type: 'image',
									asset: {
										_type: 'reference',
										_ref: heroAsset._id,
									},
								},
							},
						],
					},
				],
			},

			{
				_key: 'ticker',
				_type: 'ticker',
				description: [
					{
						_key: 'descriptionBlock',
						_type: 'block',
						children: [
							{
								_key: 'descriptionSpan',
								_type: 'span',
								marks: [],
								text: 'Free shipping on orders over $100 with code SPRING2026 ❖',
							},
						],
						markDefs: [],
						style: 'normal',
					},
				],
			},

			{
				_key: 'features-section',
				_type: 'alternatingProductFeatures',
				features: [
					{
						_key: 'feature-1',
						_type: 'feature',
						title: 'Product Feature #1',
						description: [
							{
								_key: 'descriptionBlock',
								_type: 'block',
								children: [
									{
										_key: 'descriptionSpan',
										_type: 'span',
										marks: [],
										text: 'Id ullamco aliqua tempor voluptate laborum sint laborum commodo dolore. Esse nostrud deserunt elit ad in reprehenderit.',
									},
								],
								markDefs: [],
								style: 'normal',
							},
						],
						media: [
							{
								_key: 'mediaImage',
								_type: 'mediaImage',
								image: {
									_type: 'image',
									asset: {
										_ref: tshirtAsset._id,
										_type: 'reference',
									},
								},
							},
						],
					},
					{
						_key: 'feature-2',
						_type: 'feature',
						title: 'Product Feature #2',
						description: [
							{
								_key: 'descriptionBlock',
								_type: 'block',
								children: [
									{
										_key: 'descriptionSpan',
										_type: 'span',
										marks: [],
										text: 'Id ullamco aliqua tempor voluptate laborum sint laborum commodo dolore. Esse nostrud deserunt elit ad in reprehenderit.',
									},
								],
								markDefs: [],
								style: 'normal',
							},
						],
						media: [
							{
								_key: 'mediaImage',
								_type: 'mediaImage',
								image: {
									_type: 'image',
									asset: {
										_ref: tshirtAsset._id,
										_type: 'reference',
									},
								},
							},
						],
					},
				],
			},

			{
				_key: 'productGrid',
				_type: 'productGrid',
				title: 'Merch',
				products: [
					{
						_type: 'reference',
						_key: `${tShirtProduct._id}-1`,
						_ref: tShirtProduct._id,
					},
					{
						_type: 'reference',
						_key: `${tShirtProduct._id}-2`,
						_ref: tShirtProduct._id,
					},
					{
						_type: 'reference',
						_key: `${tShirtProduct._id}-3`,
						_ref: tShirtProduct._id,
					},
					{
						_type: 'reference',
						_key: `${tShirtProduct._id}-4`,
						_ref: tShirtProduct._id,
					},
				],
			},
		],
	});

	// Update product landing
	console.log('Updating product landing');

	await client
		.patch(tShirtProduct._id)
		.set({
			components: [
				{
					_key: 'ticker',
					_type: 'ticker',
					description: [
						{
							_key: 'descriptionBlock',
							_type: 'block',
							children: [
								{
									_key: 'descriptionSpan',
									_type: 'span',
									marks: [],
									text: 'Free shipping on orders over $100 with code SPRING2026 ❖',
								},
							],
							markDefs: [],
							style: 'normal',
						},
					],
				},
				{
					_key: 'features-section',
					_type: 'alternatingProductFeatures',
					features: [
						{
							_key: 'feature-1',
							_type: 'feature',
							title: 'Product Feature #1',
							description: [
								{
									_key: 'descriptionBlock',
									_type: 'block',
									children: [
										{
											_key: 'descriptionSpan',
											_type: 'span',
											marks: [],
											text: 'Id ullamco aliqua tempor voluptate laborum sint laborum commodo dolore. Esse nostrud deserunt elit ad in reprehenderit.',
										},
									],
									markDefs: [],
									style: 'normal',
								},
							],
							media: [
								{
									_key: 'mediaImage',
									_type: 'mediaImage',
									image: {
										_type: 'image',
										asset: {
											_ref: tshirtAsset._id,
											_type: 'reference',
										},
									},
								},
							],
						},
						{
							_key: 'feature-2',
							_type: 'feature',
							title: 'Product Feature #2',
							description: [
								{
									_key: 'descriptionBlock',
									_type: 'block',
									children: [
										{
											_key: 'descriptionSpan',
											_type: 'span',
											marks: [],
											text: 'Id ullamco aliqua tempor voluptate laborum sint laborum commodo dolore. Esse nostrud deserunt elit ad in reprehenderit.',
										},
									],
									markDefs: [],
									style: 'normal',
								},
							],
							media: [
								{
									_key: 'mediaImage',
									_type: 'mediaImage',
									image: {
										_type: 'image',
										asset: {
											_ref: tshirtAsset._id,
											_type: 'reference',
										},
									},
								},
							],
						},
					],
				},
				{
					_key: 'productGrid',
					_type: 'productGrid',
					title: 'Related Products',
					products: [
						{
							_type: 'reference',
							_key: `${tShirtProduct._id}-1`,
							_ref: tShirtProduct._id,
						},
						{
							_type: 'reference',
							_key: `${tShirtProduct._id}-2`,
							_ref: tShirtProduct._id,
						},
						{
							_type: 'reference',
							_key: `${tShirtProduct._id}-3`,
							_ref: tShirtProduct._id,
						},
						{
							_type: 'reference',
							_key: `${tShirtProduct._id}-4`,
							_ref: tShirtProduct._id,
						},
					],
				},
			],
		})
		.commit();

	// Setting up layout and global config
	console.log('Creating header and footer');

	const header = await client.create({
		_type: 'header',
		title: 'Site Header',
		links: [
			{
				_type: 'link',
			},
		],
		links: [
			{
				_key: merchCollection._id,
				_type: 'collectionLink',
				collection: {
					_ref: merchCollection._id,
					_type: 'reference',
				},
				title: 'Shop',
			},
			{
				_key: 'getSproutLink',
				_type: 'link',
				openInNewWindow: true,
				title: 'Get Sprout',
				url: 'https://sprout.store',
			},
			{
				_key: 'documentationLink',
				_type: 'link',
				openInNewWindow: true,
				title: 'Documentation',
				url: 'https://gardenernyc.notion.site/Sprout-Documentation-3189ba94a21342d89dd40162491da6f7?source=copy_link',
			},
		],
	});

	const footer = await client.create({
		_type: 'footer',
		title: 'Site Footer',
		footerColumns: [
			{
				_key: 'storeColumn',
				_type: 'footerColumn',
				title: 'Store',
				links: [
					{
						_key: merchCollection._id,
						_type: 'collectionLink',
						collection: {
							_ref: merchCollection._id,
							_type: 'reference',
						},
						title: 'Shop All',
					},
					{
						_key: tShirtProduct._id,
						_type: 'productLink',
						productLanding: {
							_ref: tShirtProduct._id,
							_type: 'reference',
						},
						title: 'T-Shirt',
					},
				],
			},
			{
				_key: 'companyColumn',
				_type: 'footerColumn',
				title: 'Company',
				links: [
					{
						_key: 'getSproutLink',
						_type: 'link',
						openInNewWindow: true,
						title: 'About',
						url: 'https://sprout.store',
					},
					{
						_key: 'documentationLink',
						_type: 'link',
						openInNewWindow: true,
						title: 'Documentation',
						url: 'https://gardenernyc.notion.site/Sprout-Documentation-3189ba94a21342d89dd40162491da6f7?source=copy_link',
					},
					{
						_key: 'termsLink',
						_type: 'pageLink',
						page: {
							_ref: termsPage._id,
							_type: 'reference',
						},
					},
				],
			},
		],
		newsletterTitle: 'Newsletter',
		klaviyoListId: 'YOUR_KLAVIYO_LIST_ID',
		klaviyoSourceId: 'YOUR_KLAVIYO_SOURCE_ID',
	});

	// Setting up layout and global config
	console.log('Setting up layout and global config');

	const layout = await client.create({
		_type: 'layout',
		title: 'Site Layout',

		header: {
			_type: 'reference',
			_ref: header._id,
			_key: header._id,
		},

		footer: {
			_type: 'reference',
			_ref: footer._id,
			_key: footer._id,
		},

		cart: {
			_type: 'reference',
			_ref: cart._id,
			_key: cart._id,
		},

		promoBanner: {
			_type: 'reference',
			_ref: promoBanner._id,
			_key: promoBanner._id,
		},

		notFoundPage: {
			_type: 'reference',
			_ref: notFoundPage._id,
			_key: notFoundPage._id,
		},

		homepage: {
			_type: 'reference',
			_ref: homepage._id,
			_key: homepage._id,
		},
	});

	await client.create({
		_type: 'globalConfig',
		_id: 'globalConfig',

		layout: {
			_type: 'reference',
			_ref: layout._id,
			_key: layout._id,
		},

		seo: {
			_type: 'seo',
			initSeo: true,

			metaTitle: 'Sprout',
			metaDescription:
				'A battle-tested Next/Sanity boilerplate for building headless Shopify stores and marketing websites.',
			openGraphTitle: 'Sprout',
			openGraphDescription:
				'A battle-tested Next/Sanity boilerplate for building headless Shopify stores and marketing websites.',
			twitterTitle: 'Sprout',
			twitterDescription:
				'A battle-tested Next/Sanity boilerplate for building headless Shopify stores and marketing websites.',

			openGraphImage: {
				_type: 'image',
				asset: {
					_type: 'reference',
					_ref: seoAsset._id,
				},
			},
			twitterImage: {
				_type: 'image',
				asset: {
					_type: 'reference',
					_ref: seoAsset._id,
				},
			},
		},
	});

	console.log(`Successfully initialized ${dataset} dataset`);
};

module.exports = {
	initializeDataset,
};
