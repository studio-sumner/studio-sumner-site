import {useEffect, useState} from 'react';
import algolia from 'algoliasearch/lite';

const algoliaClient = algolia(
	process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
	process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,
);

const searchIndex = algoliaClient.initIndex(
	process.env.NEXT_PUBLIC_ALGOLIA_INDEX,
);

const useSearchResults = query => {
	const [hasFetched, setHasFetched] = useState(false);
	const [isSubmitting, setSubmitting] = useState(false);
	const [results, setResults] = useState([]);

	useEffect(() => {
		if (!query) {
			setResults([]);
			setSubmitting(false);
			return;
		}

		const fetchQuery = async () => {
			setSubmitting(true);

			try {
				const {hits = []} = await searchIndex.search(query, {
					hitsPerPage: 100,
				});
				setResults(hits);
			} catch (error) {
				console.log(error);
			}

			setSubmitting(false);
			setHasFetched(true);
		};

		fetchQuery();
	}, [query]);

	return {results, isSubmitting, hasFetched};
};

export default useSearchResults;
