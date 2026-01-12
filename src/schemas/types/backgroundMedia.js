import React, {useState, useEffect} from 'react';
import Emoji from 'a11y-react-emoji';
import {VideoPreview} from './video';
import {useClient} from 'sanity';
import imageUrlBuilder from '@sanity/image-url';

const Icon = () => <Emoji style={{fontSize: '1.5em'}} symbol="🏞" />;

export const BackgroundMediaIcon = ({background}) => {
	const client = useClient({
		apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
	});
	const builder = imageUrlBuilder(client)
		.projectId(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
		.dataset(process.env.NEXT_PUBLIC_SANITY_DATASET);
	const [videoAsset, setVideoAsset] = useState(null);

	useEffect(() => {
		if (background && background._type === 'video') {
			client.getDocument(background._ref).then(videoDoc => {
				client.getDocument(videoDoc.video.asset._ref).then(assetDoc => {
					setVideoAsset(assetDoc);
				});
			});
		}
	}, [background]);

	if (!background) {
		return <Icon />;
	} else if (background._type === 'backgroundImage' && background.image) {
		return (
			<img
				style={{
					display: 'block',
					width: '100%',
					height: '100%',
					objectFit: 'cover',
				}}
				src={builder
					.image(background.image)
					.width(35)
					.height(35)
					.dpr(2)
					.url()}
			/>
		);
	} else if (background._type === 'video' && videoAsset) {
		return (
			<VideoPreview
				playbackId={videoAsset.playbackId}
				thumbTime={videoAsset.thumbTime}
			/>
		);
	} else {
		return <Icon />;
	}
};

export default {
	name: 'backgroundMedia',
	title: 'Background Media',
	icon: Icon,
	type: 'array',
	of: [
		{
			name: 'video',
			title: 'Video',
			type: 'reference',
			to: [{type: 'video'}],
		},
		{
			name: 'backgroundImage',
			title: 'Background Image',
			icon: Icon,
			type: 'object',
			fields: [
				{
					name: 'image',
					title: 'Image',
					type: 'image',
					description: 'This should be a 3000x2000 JPG.',
					validation: Rule => Rule.required(),
				},
				{
					name: 'imageMobile',
					title: 'Image (Mobile)',
					type: 'image',
					description:
						'Add this optional image for mobile that should be a 2000x2000 JPG',
				},
			],
			preview: {
				select: {
					alt: 'image.alt',
					image: 'image',
				},
				prepare: ({alt, image}) => ({
					title: alt,
					subtitle: 'Image',
					media: image || <Icon />,
				}),
			},
		},
	],
	validation: Rule => Rule.max(1),
};
