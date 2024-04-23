require('../../utils/dot-env');

const groq = require('groq');
const {createClient} = require('@sanity/client');
const {product: productQuery} = require('../../api/queries');

const useCdn = process.env.SANITY_USE_CDN === 'true';
const client = createClient({
	projectId: process.env.SANITY_PROJECT_ID,
	dataset: process.env.SANITY_DATASET,
	token: useCdn ? null : process.env.SANITY_API_TOKEN,
	apiVersion: process.env.SANITY_API_VERSION,
	useCdn,
});

const productById = id => groq`*[
	_type == "product" &&
	!(_id in path("drafts.**")) &&
	_id == "${id}"
][0] ${productQuery}`;

export default async (req, res) => {
	// Validate product_id
	if (!req.query.product_id) {
		return res.status(400).json({message: 'Invalid product_id'});
	}

	let document;

	try {
		document = await client.fetch(productById(req.query.product_id));
	} catch (error) {
		return res.status(500).json({message: 'Error fetching product'});
	}

	res.status(200).send(document);
};
