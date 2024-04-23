export function decode(str) {
	const raw = str.split('shopify/')[1];

	const [type, id] = raw.split('/');

	const params = (id.split('?').slice(1)[0] || '')
		.split('&')
		.reduce((p, q) => {
			const [key, value] = q.split('=');
			p[key] = value;
			return p;
		}, {});

	return {
		type,
		id: id.split('?')[0],
		params,
		raw: str,
	};
}

export function encode(type, id, params = {}) {
	let full = `gid://shopify/${type}/${id}`;

	let query = [];
	const keys = Object.keys(params);

	if (keys.length > 0) {
		for (let i = 0; i < keys.length; i++) {
			query.push(keys[i] + '=' + params[keys[i]]);
		}

		query = '?' + query.join('&');

		full += query;
	}

	return full;
}
