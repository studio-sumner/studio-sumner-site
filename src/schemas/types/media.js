import React, {useState, useEffect} from 'react';
import Emoji from 'a11y-react-emoji';
import {VideoPreview} from './video';
import {useClient} from 'sanity';
import imageUrlBuilder from '@sanity/image-url';

const VideoIcon = () => <Emoji style={{fontSize: '1.5em'}} symbol="📹" />;
const Icon = () => <Emoji style={{fontSize: '1.5em'}} symbol="🏞" />;

export const MediaIcon = ({media}) => {
	const client = useClient({apiVersion: '2021-06-07'});
	const builder = imageUrlBuilder(client)
		.projectId(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
		.dataset(process.env.NEXT_PUBLIC_SANITY_DATASET);
	const [videoAsset, setVideoAsset] = useState(null);

	useEffect(() => {
		if (media && media._type === 'mediaVideo') {
			client.getDocument(media.video._ref).then(videoDoc => {
				client.getDocument(videoDoc.video.asset._ref).then(assetDoc => {
					setVideoAsset(assetDoc);
				});
			});
		}
	}, [media]);

	if (!media) {
		return <Icon />;
	} else if (
		media._type === 'mediaImage' &&
		media.image &&
		media.image.asset
	) {
		return (
			<img
				style={{
					display: 'block',
					width: '100%',
					height: '100%',
					objectFit: 'cover',
				}}
				src={builder
					.image(media.image)
					.width(35)
					.height(35)
					.dpr(2)
					.url()}
			/>
		);
	} else if (media._type === 'mediaVideo' && videoAsset) {
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
	name: 'media',
	title: 'Media',
	icon: Icon,
	type: 'array',
	of: [
		{
			name: 'mediaVideo',
			title: 'Video',
			icon: VideoIcon,
			type: 'object',
			fields: [
				{
					name: 'showControls',
					title: 'Show Controls',
					type: 'boolean',
					description:
						'If checked, full controls are shown. Otherwise this video autoplays/loops on mute and the play button is shown.',
					initialValue: true,
				},
				{
					name: 'video',
					title: 'Video',
					type: 'reference',
					to: [{type: 'video'}],
					validation: Rule => Rule.required(),
				},
			],
			preview: {
				select: {
					title: 'video.title',
					playbackId: 'video.video.asset.playbackId',
					thumbTime: 'video.video.asset.thumbTime',
				},
				prepare: ({title, playbackId, thumbTime}) => ({
					title,
					subtitle: 'Video',
					media: (
						<VideoPreview
							playbackId={playbackId}
							thumbTime={thumbTime}
						/>
					),
				}),
			},
		},

		{
			name: 'mediaImage',
			title: 'Image',
			icon: Icon,
			type: 'object',
			fields: [
				{
					name: 'image',
					title: 'Image',
					type: 'image',
					validation: Rule => Rule.required(),
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
