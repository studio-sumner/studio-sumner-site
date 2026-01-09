require('./src/utils/dot-env');

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

//
// === Queries ===
//

const redirectsQuery = groq`*[
	_type == "redirect" &&
	!(_id in path("drafts.**"))
] {
	'source': fromPath,
	'destination': toPath,
	permanent,
}`;

module.exports = {
	redirects: async () => {
		const allRedirects = await client.fetch(redirectsQuery);

		const sanitizedRedirects = allRedirects.map(r => ({
			...r,
			permanent: Boolean(r.permanent),
		}));

		return sanitizedRedirects;
	},

	rewrites: async () => [
		{
			source: '/sitemap.xml',
			destination: '/api/sitemap',
		},
		{
			source: '/robots.txt',
			destination: '/api/robots',
		},
	],
};
