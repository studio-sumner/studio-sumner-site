import {useSearchParams, useRouter, usePathname} from 'next/navigation';
import queryString from 'query-string';

export default () => {
	const {push} = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const sortParam = searchParams.get('sort');
	const viewParam = searchParams.get('view');
	const tagsParam = searchParams.get('tags');

	let tags = [];

	if (tagsParam) {
		tags = tagsParam.split(',').map(tag => tag.trim());
	}

	const setTags = (tags = []) => {
		const query = queryString.parse(window.location.search);

		const newQuery = {
			...query,
			tags,
			s: '0',
		};

		push(
			`${pathname}?${queryString.stringify(newQuery, {
				arrayFormat: 'comma',
			})}`,
			{scroll: false},
		);
	};

	const setSort = sort => {
		const query = queryString.parse(window.location.search);

		const newQuery = {
			...query,
			sort,
			s: '0',
		};

		push(
			`${pathname}?${queryString.stringify(newQuery, {
				arrayFormat: 'comma',
			})}`,
			{scroll: false},
		);
	};

	const setView = view => {
		const query = queryString.parse(window.location.search);

		const newQuery = {
			...query,
			view,
			s: '0',
		};

		push(
			`${pathname}?${queryString.stringify(newQuery, {
				arrayFormat: 'comma',
			})}`,
			{scroll: false},
		);
	};

	return {
		tags,
		view: viewParam || 'column',
		sort: sortParam || 'featured',
		setTags,
		setView,
		setSort,
	};
};
