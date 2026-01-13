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

	const [tshirtImageBuffer, heroImageBuffer] = await Promise.all([
		fs.promises.readFile(tshirtPath),
		fs.promises.readFile(heroPath),
	]);

	const [tshirtAsset, heroAsset] = await Promise.all([
		client.assets.upload('image', tshirtImageBuffer),
		client.assets.upload('image', heroImageBuffer),
	]);

	// Create initial pages
	console.log('Creating initial pages');

	const [promoBanner, cart, notFoundPage, tShirtProduct] = await Promise.all([
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
				_ref: tShirtProduct._id,
				_key: tShirtProduct._id,
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
		],
	});

	// Setting up layout and global config
	console.log('Setting up layout and global config');

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
				],
			},
		],
		newsletterTitle: 'Newsletter',
		klaviyoListId: 'YOUR_KLAVIYO_LIST_ID',
		klaviyoSourceId: 'YOUR_KLAVIYO_SOURCE_ID',
	});

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
	});

	console.log(`Successfully initialized ${dataset} dataset`);
};

module.exports = {
	initializeDataset,
};
