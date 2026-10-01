require('../utils/dot-env');

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

const DESCRIPTION =
	'Preserve what matters locally. Strengthen what benefits from scale.';

const textBlock = (key, text) => ({
	_key: key,
	_type: 'block',
	children: [{_key: `${key}-span`, _type: 'span', marks: [], text}],
	markDefs: [],
	style: 'normal',
});

const placeholderPage = (title, slug) => ({
	_type: 'page',
	title,
	slug: {current: slug},
	components: [
		{
			_key: 'placeholder',
			_type: 'pageRichText',
			title,
			description: [textBlock('placeholder', 'Content coming soon.')],
		},
	],
});

const ref = doc => ({_type: 'reference', _ref: doc._id});

const pageLink = (key, page, title) => ({
	_key: key,
	_type: 'pageLink',
	page: ref(page),
	title,
});

const initializeDataset = async dataset => {
	console.log(`Initializing ${dataset} dataset with default values`);

	// Uploading images to sanity
	console.log('Uploading placeholder hero image');

	const heroImageBuffer = await fs.promises.readFile(
		path.join(__dirname, 'assets', 'hero.jpg'),
	);
	const heroAsset = await client.assets.upload('image', heroImageBuffer);

	// Create pages
	console.log('Creating pages');

	const [notFoundPage, whoWeAre, partners, careers] = await Promise.all([
		client.create({
			_type: 'notFound',
			title: '404',
			cta: [{_type: 'link', _key: 'notFoundCta', title: 'Go home', url: '/'}],
		}),
		client.create(placeholderPage('Who we are', 'who-we-are')),
		client.create(placeholderPage('Partner with us', 'partners')),
		client.create(placeholderPage('Working at Lightswitch', 'careers')),
	]);

	const homepage = await client.create({
		_type: 'page',
		title: 'Homepage',
		slug: {current: 'homepage'},
		components: [
			{
				_key: 'hero',
				_type: 'fullWidthHeroCarousel',
				slides: [
					{
						_key: 'heroSlide1',
						_type: 'slide',
						title: 'A long-term home for exceptional property management companies.',
						cta: [pageLink('heroCta1', partners, 'For company owners')],
						background: [
							{
								_key: 'heroBackground1',
								_type: 'backgroundImage',
								image: {_type: 'image', asset: ref(heroAsset)},
							},
						],
					},
				],
			},
		],
	});

	// Setting up layout and global config
	console.log('Creating header and footer');

	const header = await client.create({
		_type: 'header',
		title: 'Site Header',
		links: [
			pageLink('whoWeAreLink', whoWeAre),
			pageLink('partnersLink', partners),
			pageLink('careersLink', careers),
		],
	});

	const footer = await client.create({
		_type: 'footer',
		title: 'Site Footer',
		footerColumns: [
			{
				_key: 'companyColumn',
				_type: 'footerColumn',
				title: 'Lightswitch',
				links: [
					pageLink('whoWeAreLink', whoWeAre),
					pageLink('partnersLink', partners),
					pageLink('careersLink', careers),
				],
			},
		],
	});

	console.log('Setting up layout and global config');

	const layout = await client.create({
		_type: 'layout',
		title: 'Site Layout',
		header: ref(header),
		footer: ref(footer),
		notFoundPage: ref(notFoundPage),
		homepage: ref(homepage),
	});

	await client.create({
		_type: 'globalConfig',
		_id: 'globalConfig',
		layout: ref(layout),
		seo: {
			_type: 'seo',
			initSeo: true,
			metaTitle: 'Lightswitch',
			metaDescription: DESCRIPTION,
			openGraphTitle: 'Lightswitch',
			openGraphDescription: DESCRIPTION,
			twitterTitle: 'Lightswitch',
			twitterDescription: DESCRIPTION,
		},
	});

	console.log(`Successfully initialized ${dataset} dataset`);
};

module.exports = {
	initializeDataset,
};
