import queryString from 'query-string';

const DEFAULT_PROPS = {
	auto: 'format',
	q: '75',
};

const sanityImageUrl = (src = '', props = {}) => {
	const updatedProps = {
		...DEFAULT_PROPS,
		...props,
	};

	const {url, ...propsWithoutUrl} = updatedProps;
	const query = queryString.stringify(propsWithoutUrl);

	return `${src}?${query}`;
};

export default sanityImageUrl;
