import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '2em'}} symbol="ℹ️" />;

export default {
	name: 'drawerGlobal',
	title: 'Drawer (Global)',
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
			name: 'drawerTitle',
			title: 'Drawer Title',
			type: 'string',
			validation: Rule => Rule.required(),
		},
		{
			name: 'description',
			title: 'Description',
			type: 'richText',
		},
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'drawerTitle',
		},
		prepare: selection => ({
			...selection,
			media: <Icon />,
		}),
	},
};
