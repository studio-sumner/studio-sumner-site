require('../utils/dot-env');

const groq = require('groq');
const {createClient} = require('@sanity/client');

const client = createClient({
	projectId: process.env.SANITY_PROJECT_ID,
	dataset: process.env.SANITY_DATASET,
	token: process.env.SANITY_API_TOKEN,
	apiVersion: process.env.SANITY_API_VERSION,
	useCdn: false,
});

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

module.exports = {
	deleteProducts,
	deleteVariants,
};
