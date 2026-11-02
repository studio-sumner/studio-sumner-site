require('../utils/dot-env');

const {createClient} = require('@sanity/client');

const client = createClient({
	projectId: process.env.SANITY_PROJECT_ID,
	dataset: process.env.SANITY_DATASET,
	token: process.env.SANITY_API_TOKEN,
	apiVersion: process.env.SANITY_API_VERSION,
	useCdn: false,
});

// Copy from the About prototype in Design Studio (christopher/about). Documents have fixed IDs, so
// running this again resets them to this copy.

const DESCRIPTION =
	'Studio Sumner designs brands and websites for new venture capital firms and the companies they invest in. Los Angeles.';

const CLIENTS = [
	'Bain Capital Crypto',
	'Bain Capital Ventures',
	'Category Ventures',
	'Champion',
	'Checkmate',
	'Expedia',
	'Genesis Capital',
	'Heretic Ventures',
	'Practice',
	'Revenant Capital',
	'Tonic.xyz',
	'Tournesol',
	'True Botanicals',
	'University of British Columbia',
	'Zoox',
];

const SERVICES = [
	{name: 'Brand', detail: 'Identity, naming, strategy'},
	{name: 'Websites', detail: 'Design, e-commerce, prototyping'},
	{name: 'Product', detail: 'Interface design, mobile apps, design systems'},
	{name: 'Launch', detail: 'Pitch decks, investor communications, campaigns'},
];

const ref = _id => ({_type: 'reference', _ref: _id});

const key = text => text.toLowerCase().replace(/[^a-z0-9]+/g, '-');

// A paragraph from runs of text. A run is a string, or [text, {href, openInNewWindow}] for a link.
const paragraph = (blockKey, runs) => {
	const markDefs = [];
	const children = runs.map((run, i) => {
		const [text, link] = Array.isArray(run) ? run : [run];
		const marks = [];
		if (link) {
			const linkKey = `${blockKey}-link-${i}`;
			markDefs.push({_key: linkKey, _type: 'link', ...link});
			marks.push(linkKey);
		}
		return {_key: `${blockKey}-span-${i}`, _type: 'span', marks, text};
	});
	return {
		_key: blockKey,
		_type: 'block',
		style: 'normal',
		children,
		markDefs,
	};
};

const initializeDataset = async dataset => {
	console.log(`Initializing ${dataset} dataset with default values`);

	console.log('Creating pages');

	await client.createOrReplace({
		_id: 'notFound',
		_type: 'notFound',
		title: 'Page not found',
		cta: [
			{
				_type: 'link',
				_key: 'notFoundCta',
				title: 'Back to Studio Sumner',
				url: '/',
			},
		],
	});

	await client.createOrReplace({
		_id: 'page-info',
		_type: 'page',
		title: 'Info',
		slug: {_type: 'slug', current: 'info'},
		components: [
			{
				_key: 'statement',
				_type: 'statement',
				text: [
					paragraph('statement', [
						'I currently lead digital design at ',
						[
							'The Digital Stronghold',
							{
								href: 'https://thedigitalstronghold.com',
								openInNewWindow: true,
							},
						],
						' and its growing portfolio of brands. Through Sumner, my studio in Los Angeles, I design brands and websites for new venture capital firms and the companies they invest in.',
					]),
				],
			},
			{
				_key: 'clientsAndServices',
				_type: 'clientsAndServices',
				clientsTitle: 'Selected clients',
				clients: CLIENTS,
				servicesTitle: 'Services',
				services: SERVICES.map(service => ({
					_key: key(service.name),
					_type: 'service',
					...service,
				})),
			},
			{
				_key: 'details',
				_type: 'details',
				items: [
					{
						_key: 'about',
						_type: 'detail',
						title: 'About',
						text: [
							paragraph('about', [
								'Sumner takes on select projects. Previously embedded with in-house teams across travel, mobility, and retail.',
							]),
						],
					},
					{
						_key: 'new-business',
						_type: 'detail',
						title: 'New business',
						text: [
							paragraph('new-business', [
								'For projects, email ',
								[
									'christopher@wearesumner.com',
									{
										href: 'mailto:christopher@wearesumner.com',
									},
								],
								'.',
							]),
						],
					},
					{
						_key: 'studio',
						_type: 'detail',
						title: 'Studio',
						text: [
							paragraph('studio', [
								'Sumner\nLos Angeles, California',
							]),
						],
					},
				],
			},
		],
	});

	console.log('Creating header and footer');

	await client.createOrReplace({
		_id: 'header',
		_type: 'header',
		title: 'Site Header',
		siteTitle: 'Studio Sumner',
		hoverTitle: 'For ambitious founders',
		navItems: [
			{
				_key: 'info',
				_type: 'navItem',
				title: 'Info',
				page: ref('page-info'),
			},
			{_key: 'work', _type: 'navItem', title: 'Work'},
			{_key: 'contact', _type: 'navItem', title: 'Contact'},
		],
	});

	await client.createOrReplace({
		_id: 'footer',
		_type: 'footer',
		title: 'Site Footer',
		wordmark: 'Studio Sumner',
		wordmarkMobile: 'Sumner',
		copyright: '© 2026 Christopher Morben, Studio Sumner.',
	});

	console.log('Setting up layout and global config');

	await client.createOrReplace({
		_id: 'layout',
		_type: 'layout',
		title: 'Site Layout',
		header: ref('header'),
		footer: ref('footer'),
		notFoundPage: ref('notFound'),
		homepage: ref('page-info'),
	});

	await client.createOrReplace({
		_id: 'globalConfig',
		_type: 'globalConfig',
		layout: ref('layout'),
		seo: {
			_type: 'seo',
			initSeo: true,
			metaTitle: 'Studio Sumner',
			metaDescription: DESCRIPTION,
			openGraphTitle: 'Studio Sumner',
			openGraphDescription: DESCRIPTION,
			twitterTitle: 'Studio Sumner',
			twitterDescription: DESCRIPTION,
		},
	});

	console.log(`Successfully initialized ${dataset} dataset`);
};

module.exports = {
	initializeDataset,
};
