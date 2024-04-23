import map from 'lodash/map';

const DEFAULT_PROPS = {
	auto: 'format',
	q: '75',
};

const sanityImageUrl = (src = '', props = {}) => {
	const updatedProps = {
		...DEFAULT_PROPS,
		...props,
	};

	const query = map(updatedProps, (value, key) => `${key}=${value}`);

	return `${src}?${query.join('&')}`;
};

export default sanityImageUrl;
