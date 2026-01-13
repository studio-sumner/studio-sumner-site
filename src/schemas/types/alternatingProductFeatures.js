import React from 'react';
import Emoji from 'a11y-react-emoji';
import {MediaIcon} from './media';

const Icon = () => <Emoji style={{fontSize: '1.5em'}} symbol="💡" />;

export default {
	name: 'alternatingProductFeatures',
	title: 'Alternating Product Features',
	thumbnailUrl: '/cms/alternating-product-features.jpg',
	icon: Icon,
	type: 'object',
	fields: [
		{
			name: 'features',
			title: 'Features',
			type: 'array',
			of: [
				{
					name: 'feature',
					title: 'Feature',
					type: 'object',
					fields: [
						{
							name: 'title',
							title: 'Title',
							type: 'string',
						},
						{
							name: 'description',
							title: 'Description',
							type: 'richText',
						},
						{
							name: 'media',
							title: 'Media',
							type: 'media',
							validation: Rule => Rule.required().min(1).max(1),
						},
					],
					preview: {
						select: {
							title: 'title',
							media: 'media',
						},
						prepare: ({title, media}) => ({
							title,
							media: (
								<MediaIcon media={media ? media[0] : null} />
							),
						}),
					},
				},
			],
			validation: Rule => Rule.min(1).max(12),
		},
	],
	preview: {
		select: {
			title: 'features.0.title',
			media: 'features.0.media',
		},
		prepare: ({title, media}) => ({
			title,
			media: <MediaIcon media={media ? media[0] : null} />,
		}),
	},
};
