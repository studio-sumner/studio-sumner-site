import route from '../../plugins/shopify/api/shopifyProductSync';

// Disable body parser for this request to validate webhook
export const config = {
	api: {
		bodyParser: false,
	},
};

export default async (...args) => await route(...args);
