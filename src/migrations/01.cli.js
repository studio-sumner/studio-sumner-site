require('../utils/dot-env');

const groq = require('groq');
const sade = require('sade');
const {createClient} = require('@sanity/client');

const client = createClient({
	projectId: process.env.SANITY_PROJECT_ID,
	dataset: process.env.SANITY_DATASET,
	token: process.env.SANITY_API_TOKEN,
	apiVersion: process.env.SANITY_API_VERSION,
	useCdn: false,
});

const prog = sade('sprout');

prog.version('1.0.0');

//
// === Clean ===
//

const deleteProducts = async () => {
	console.log('Deleting orphaned products');

	const products = await client.fetch(groq`
		*[
			_type == "product" &&
			deleted
		] {
			...
		}
	`);

	let tx = client.transaction();

	products.forEach(product => {
		tx = tx.delete(product._id);
	});

	await tx.commit();

	console.log(`Successfully deleted ${products.length} products`);
};

const deleteVariants = async () => {
	console.log('Deleting orphaned variants');

	const variants = await client.fetch(groq`
		*[
			_type == "productVariant" &&
			count(*[ _type == "product" && references(^._id)]) == 0 &&
			!(_id in path("drafts.**"))] {
				...
			}
	`);

	let tx = client.transaction();

	variants.forEach(variant => {
		tx = tx.delete(variant._id);
	});

	await tx.commit();

	console.log(`Successfully deleted ${variants.length} variants`);
};

const initializeDataset = async dataset => {
	console.log(`Initializing ${dataset} dataset with default values`);

	const [header, footer, cart, notFoundPage, homepage] = await Promise.all([
		client.create({
			_type: 'header',
			title: 'Site Header',
		}),

		client.create({
			_type: 'footer',
			title: 'Site Footer',
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
			_type: 'page',
			title: 'Homepage',
			slug: {
				current: 'homepage',
			},
		}),
	]);

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

//
// === Interface ===
//

prog.command('clear_products')
	.describe('Deletes all orphaned products')
	.example('clear_products')
	.action(deleteProducts);

prog.command('clear_variants')
	.describe('Deletes all orphaned products')
	.example('clear_variants')
	.action(deleteVariants);

prog.command('initialize_dataset <dataset>')
	.describe('Initializes dataset with default values')
	.example('initialize_dataset production')
	.action(initializeDataset);

//
// === Start program ===
//

async function init() {
	const {args, handler} = prog.parse(process.argv, {lazy: true});
	await handler.apply(null, args);
}

init();
