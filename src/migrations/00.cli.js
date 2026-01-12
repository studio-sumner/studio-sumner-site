require('../utils/dot-env');

const groq = require('groq');
const sade = require('sade');
const {createClient} = require('@sanity/client');
const {initializeDataset} = require('./01.initialize');
const {deleteProducts, deleteVariants} = require('./02.ecomm');

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
// === Interface ===
//

// Initialize
prog.command('initialize_dataset <dataset>')
	.describe('Initializes dataset with default values')
	.example('initialize_dataset production')
	.action(initializeDataset);

// ECOMM
prog.command('clear_products')
	.describe('Deletes all orphaned products')
	.example('clear_products')
	.action(deleteProducts);

prog.command('clear_variants')
	.describe('Deletes all orphaned products')
	.example('clear_variants')
	.action(deleteVariants);

//
// === Start program ===
//

async function init() {
	const {args, handler} = prog.parse(process.argv, {lazy: true});
	await handler.apply(null, args);
}

init();
