import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '1.5em'}} symbol="👟" />;

export default {
	name: 'footer',
	title: 'Footer',
	icon: Icon,
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			description: 'Only used internally in the CMS',
			validation: Rule => Rule.required(),
		},

		{
			name: 'wordmark',
			title: 'Wordmark',
			type: 'string',
			description:
				'Large capitals spanning the page from 768px wide. Sized automatically to fit.',
			validation: Rule => Rule.required(),
		},
		{
			name: 'wordmarkMobile',
			title: 'Wordmark (Phones)',
			type: 'string',
			description: 'A shorter version for screens under 768px.',
			validation: Rule => Rule.required(),
		},
		{
			name: 'copyright',
			title: 'Copyright',
			type: 'string',
		},
	],
	preview: {
		select: {
			title: 'title',
		},
		prepare: selection => ({
			...selection,
			media: <Icon />,
		}),
	},
};
