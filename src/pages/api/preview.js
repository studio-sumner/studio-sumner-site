import client from '../../api/sanity';
import groq from 'groq';

export default async (req, res) => {
	// Validate if we have the token
	if (req.query.token !== process.env.NEXT_PUBLIC_CMS_PREVIEW_TOKEN) {
		return res.status(401).json({message: 'Invalid token'});
	}

	// Validate draft_id
	if (!req.query.draft_id) {
		return res.status(400).json({message: 'Invalid draft_id'});
	}

	const query = groq`*[_id == "${req.query.draft_id}"][0]`;
	let document;

	try {
		document = await client.fetch(query);
	} catch (error) {
		return res.status(500).json({message: 'Error fetching draft'});
	}

	res.setPreviewData(
		{draftId: req.query.draft_id},
		{maxAge: 60 * 5}, // Preview mode expires after 5 minutes
	);

	if (document._type === 'page') {
		res.redirect(`/${document.slug.current}`);
	} else if (document._type === 'productLanding') {
		// ECOMMERCE
		res.redirect(`/products/${document.slug.current}`);
	} else if (document._type === 'collection') {
		// ECOMMERCE
		res.redirect(`/collections/${document.slug.current}`);
	}
};
