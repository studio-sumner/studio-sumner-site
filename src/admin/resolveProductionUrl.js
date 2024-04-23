const getHost = () => {
	return process.env.NEXT_PUBLIC_SITE_ROOT;
};

export default async (prev, context) => {
	const {document} = context;

	if (!document.slug) return null;

	switch (document._type) {
		case 'productLanding':
			return `${getHost()}/products/${document.slug.current}`;
		case 'collection':
			return `${getHost()}/collections/${document.slug.current}`;
		case 'page':
			return `${getHost()}/${document.slug.current}`;
	}

	return null;
};
