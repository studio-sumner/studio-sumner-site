import React from 'react';
import Emoji from 'a11y-react-emoji';

export const VideoPreview = ({playbackId, thumbTime}) => (
	<img
		style={{
			display: 'block',
			width: '100%',
			height: '100%',
			objectFit: 'cover',
		}}
		src={`https://image.mux.com/${playbackId}/thumbnail.jpg?width=200&fit_mode=preserve&time=${
			thumbTime || '0'
		}`}
	/>
);

const Icon = () => <Emoji style={{fontSize: '2rem'}} symbol="📹" />;

export default {
	name: 'video',
	title: 'Video',
	type: 'document',
	icon: Icon,
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			description: 'Only used internally in the CMS',
			validation: Rule => Rule.required(),
		},
		{
			name: 'video',
			title: 'Video',
			type: 'mux.video',
			validation: Rule => Rule.required(),
		},
	],
	preview: {
		select: {
			title: 'title',
			playbackId: 'video.asset.playbackId',
			thumbTime: 'video.asset.thumbTime',
		},
		prepare: ({title, playbackId, thumbTime}) => ({
			title,
			subtitle: 'Video',
			media: (
				<VideoPreview playbackId={playbackId} thumbTime={thumbTime} />
			),
		}),
	},
};
