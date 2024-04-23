import groq from 'groq';
import {NextResponse} from 'next/server';
import client from '../../../../api/sanity';
import {productTile} from '../../../../api/queries';
import algolia from 'algoliasearch';

export const indexableProducts = groq`*[
	_type == "productLanding" &&
	hideFromSearch != true &&
	!(_id in path("drafts.**"))
][] ${productTile}`;

const algoliaClient = algolia(
	process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
	process.env.ALGOLIA_INDEX_API_KEY,
);

const productSearchIndex = algoliaClient.initIndex(
	process.env.NEXT_PUBLIC_ALGOLIA_INDEX,
);

// Force running the cron job
export const revalidate = 0;
export const dynamic = 'force-dynamic';

export async function GET(request, {params}) {
	let products = [];

	try {
		console.log('Fetching products...');
		products = await client.fetch(indexableProducts);
	} catch (error) {
		console.log(error);

		return new Response(
			JSON.stringify({
				error: 'An internal server error has occured.',
			}),
			{status: 500},
		);
	}

	try {
		console.log('Indexing products...');
		await productSearchIndex.replaceAllObjects(products);
	} catch (error) {
		console.log(error);

		return new Response(
			JSON.stringify({
				error: 'An internal server error has occured.',
			}),
			{status: 500},
		);
	}

	console.log(`${products.length} products successfully indexed.`);

	return NextResponse.json({
		message: `${products.length} products successfully indexed.`,
	});
}
