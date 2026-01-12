import React from 'react';
import Emoji from 'a11y-react-emoji';
import {BackgroundMediaIcon} from './backgroundMedia';

const Icon = () => <Emoji style={{fontSize: '1.5em'}} symbol="🎠" />;

export default {
	name: 'fullWidthHeroCarousel',
	title: 'Full Width Hero Carousel',
	thumbnailUrl: '/cms/full-width-hero-carousel.jpg',
	icon: Icon,
	type: 'object',
	fields: [
		{
			name: 'slides',
			title: 'Slides',
			type: 'array',
			of: [
				{
					name: 'slide',
					title: 'Slide',
					type: 'object',
					fields: [
						{
							name: 'title',
							title: 'Title',
							type: 'string',
						},
						{
							name: 'subtitle',
							title: 'Subtitle',
							type: 'string',
						},
						{
							name: 'cta',
							title: 'CTA',
							type: 'cta',
						},
						{
							name: 'background',
							title: 'Background',
							type: 'backgroundMedia',
							validation: Rule => Rule.required().max(1),
						},
					],
					preview: {
						select: {
							title: 'title',
							subtitle: 'subtitle',
							background: 'background',
						},
						prepare: ({title, subtitle, background}) => ({
							title,
							subtitle,
							media: (
								<BackgroundMediaIcon
									background={
										background ? background[0] : null
									}
								/>
							),
						}),
					},
				},
			],
		},
	],
	preview: {
		select: {
			title: 'slides.0.title',
			subtitle: 'slides.0.subtitle',
			background: 'slides.0.background',
		},
		prepare: ({title, subtitle, background}) => ({
			title,
			subtitle,
			media: (
				<BackgroundMediaIcon
					background={background ? background[0] : null}
				/>
			),
		}),
	},
};
