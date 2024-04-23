import find from 'lodash/find';

export default (options = [], variants = []) =>
	find(variants, variant => {
		for (let i = 0; i < 3; i++) {
			const newOption = options[i];
			const currentOption = variant[`option${i + 1}`];

			if (newOption && newOption !== currentOption) {
				return false;
			}
		}

		return true;
	});
