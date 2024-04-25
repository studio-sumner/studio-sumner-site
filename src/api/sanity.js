import {createClient} from '@sanity/client';
import * as queries from './queries';

const useCdn = process.env.SANITY_USE_CDN === 'true';

const client = createClient({
	projectId: process.env.SANITY_PROJECT_ID,
	dataset: process.env.SANITY_DATASET,
	token: useCdn ? null : process.env.SANITY_API_TOKEN,
	apiVersion: process.env.SANITY_API_VERSION,
	useCdn,
});

export default client;

//
// === Sanity API Requests ===
//

// Site
export const getSiteData = async () => {
	const [{layout}, config] = await Promise.all([
		client.fetch(queries.layout),
		client.fetch(queries.globalConfig),
	]);

	return {
		layout,
		config,
	};
};

// Pages
export const getHomepage = () => client.fetch(queries.homepage);
export const getAllPageSlugs = () => client.fetch(queries.pageSlugs);
export const getPageBySlug = slug => client.fetch(queries.pageBySlug(slug));
export const getPageById = id => client.fetch(queries.pageById(id));
export const getNotFoundPage = () => client.fetch(queries.notFoundPage);

// ECOMMERCE
// Products
export const getAllProductLandingSlugs = () =>
	client.fetch(queries.productLandingSlugs);
export const getProductLandingBySlug = slug =>
	client.fetch(queries.productLandingBySlug(slug));
export const getProductLandingById = id =>
	client.fetch(queries.productLandingById(id));
// Collections
export const getAllCollectionSlugs = () =>
	client.fetch(queries.collectionSlugs);
export const getCollectionBySlug = slug =>
	client.fetch(queries.collectionBySlug(slug));
export const getCollectionById = id => client.fetch(queries.collectionById(id));
