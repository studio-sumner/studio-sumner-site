require('../../utils/dot-env');

const groq = require('groq');
const {createClient} = require('@sanity/client');

const useCdn = process.env.SANITY_USE_CDN === 'true';
const client = createClient({
	projectId: process.env.SANITY_PROJECT_ID,
	dataset: process.env.SANITY_DATASET,
	token: useCdn ? null : process.env.SANITY_API_TOKEN,
	apiVersion: process.env.SANITY_API_VERSION,
	useCdn,
});

const SITE_ROOT = process.env.NEXT_PUBLIC_SITE_ROOT;

//
// === Queries ===
//

const pagesQuery = groq`*[
	_type == "page" &&
	!(_id in path("drafts.**")) &&
 	seo.hideFromSitemap != true
].slug.current`;

// ECOMMERCE
const productsQuery = groq`*[
	_type == "productLanding" &&
	!(_id in path("drafts.**")) &&
	seo.hideFromSitemap != true
].slug.current`;
const collectionsQuery = groq`*[
	_type == "collection" &&
	!(_id in path("drafts.**")) &&
	seo.hideFromSitemap != true
].slug.current`;

//
// === BUILD ===
//

export default async (req, res) => {
	const [pages, products, collections] = await Promise.all([
		client.fetch(pagesQuery),
		client.fetch(productsQuery),
		client.fetch(collectionsQuery),
	]);

	const homepageLocation = `<url><loc>${SITE_ROOT}</loc></url>`;

	const pageLocations = pages.map(
		slug => `<url><loc>${SITE_ROOT}/${slug}</loc></url>`,
	);

	// ECOMMERCE
	const productLocations = products.map(
		slug => `<url><loc>${SITE_ROOT}/products/${slug}</loc></url>`,
	);
	const collectionLocations = collections.map(
		slug => `<url><loc>${SITE_ROOT}/collections/${slug}</loc></url>`,
	);

	res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?>
		<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
			${homepageLocation}
			${pageLocations.join('\n')}
			${collectionLocations.join('\n')}
			${productLocations.join('\n')}
		</urlset>
	`);
};
