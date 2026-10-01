const getHost = () => {
	return process.env.NEXT_PUBLIC_SITE_ROOT;
};

export default async (prev, context) => {
	const {document} = context;

	if (!document.slug) return null;

	switch (document._type) {
		case 'page':
			return `${getHost()}/${document.slug.current}`;
	}

	return null;
};
