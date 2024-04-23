import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '1.5em'}} symbol="🛒" />;

export default {
	name: 'cart',
	title: 'Cart',
	icon: Icon,
	type: 'document',
	groups: [
		{name: 'main', title: 'Main', default: true},
		{name: 'empty', title: 'Empty Cart'},
		{name: 'gift', title: 'Gift Message'},
		{name: 'age', title: 'Age Gate'},
		{name: 'upsells', title: 'Upsells'},
	],
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			description: 'Only used internally in the CMS',
			group: 'main',
			validation: Rule => Rule.required(),
		},
		{
			name: 'drawerTitle',
			title: 'Drawer Title',
			type: 'string',
			group: 'main',
			validation: Rule => Rule.required(),
		},

		//
		// === Empty ===
		//
		{
			name: 'emptyStateTitle',
			title: 'Empty State Title',
			type: 'string',
			group: 'empty',
			validation: Rule => Rule.required(),
		},
		{
			name: 'emptyStateCta',
			title: 'Empty State CTA',
			type: 'cta',
			group: 'empty',
			validation: Rule => Rule.required(),
		},
	],
	preview: {
		select: {
			title: 'title',
		},
		prepare: ({title}) => ({
			title,
			media: <Icon />,
		}),
	},
};
