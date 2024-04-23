import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '1.5em'}} symbol="⭐️" />;

export default {
	name: 'promoBanner',
	title: 'Promo Banner',
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
			name: 'description',
			title: 'Description',
			type: 'richText',
			validation: Rule => Rule.required(),
		},
		{
			name: 'backgroundColor',
			title: 'Background Color',
			type: 'reference',
			to: [{type: 'colorStyle'}],
		},
		{
			name: 'invertTextColor',
			title: 'Invert Text Color',
			type: 'boolean',
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
