import reduce from 'lodash/reduce';

export default (allMetaConfigs = []) => reduce(
	allMetaConfigs,
	(meta = {}, metaObject = {}) => {
		const newMeta = {...meta};
		const keys = Object.keys(metaObject || {});

		keys.forEach(key => {
			if (!metaObject[key]) return; // Avoid null values
			newMeta[key] = metaObject[key];
		});

		return newMeta;
	},
	{},
);