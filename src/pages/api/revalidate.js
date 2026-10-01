import {isValidSignature, SIGNATURE_HEADER_NAME} from '@sanity/webhook';

const secret = process.env.SANITY_WEBHOOK_SECRET;

export const config = {
	api: {
		bodyParser: false,
	},
};

async function readBody(readable) {
	const chunks = [];
	for await (const chunk of readable) {
		chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
	}
	return Buffer.concat(chunks).toString('utf8');
}

export default async (req, res) => {
	if (req.method !== 'POST') {
		console.error('Must be a POST request');
		return res.status(401).json({message: 'Must be a POST request'});
	}

	const signature = req.headers[SIGNATURE_HEADER_NAME];
	const body = await readBody(req);

	if (!isValidSignature(body, signature, secret)) {
		res.status(401).json({success: false, message: 'Invalid signature'});
		return;
	}

	try {
		const data = JSON.parse(body);
		const {_type, slug} = data;

		switch (_type) {
			case 'page':
				await res.revalidate(`/${slug}`);
				return res.json({
					message: `Revalidated "${_type}" with slug "${slug}"`,
				});
		}

		return res.json({message: 'No managed type'});
	} catch (error) {
		console.log(error);
		return res.status(500).send({message: 'Error revalidating'});
	}
};
