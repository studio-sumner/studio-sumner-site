import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '1.5em'}} symbol="🍪" />;

export default {
	name: 'cookieBanner',
	title: 'Cookie Banner',
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
