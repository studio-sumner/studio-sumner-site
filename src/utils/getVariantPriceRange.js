import minBy from 'lodash/minBy';
import maxBy from 'lodash/maxBy';

export default (variants = []) => {
	const min = minBy(variants, 'cents');
	const max = maxBy(variants, 'cents');

	return [min, max];
};
