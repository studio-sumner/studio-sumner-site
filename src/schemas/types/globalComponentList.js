import React from 'react';
import Emoji from 'a11y-react-emoji';
import {components} from './pageComponentList';

const Icon = () => <Emoji style={{fontSize: '1.5em'}} symbol="🌐" />;

export default {
	name: 'globalComponentList',
	title: 'Global Component List',
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

		// Don't allow recurssive nesting
		{
			name: 'components',
			title: 'Components',
			type: 'array',
			of: components,
		},
	],
	preview: {
		select: {
			title: 'title',
		},
		prepare({title}) {
			return {
				title,
				media: <Icon />,
			};
		},
	},
};
