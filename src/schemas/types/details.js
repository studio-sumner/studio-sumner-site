import React from 'react';
import Emoji from 'a11y-react-emoji';
import {toPlainText} from '@portabletext/react';

const Icon = () => <Emoji style={{fontSize: '1.5em'}} symbol="📇" />;

export default {
	name: 'details',
	title: 'Details',
	icon: Icon,
	type: 'object',
	fields: [
		{
			name: 'items',
			title: 'Items',
			description:
				'Short labelled blocks, a third of the page wide from 768px.',
			type: 'array',
			of: [
				{
					name: 'detail',
					title: 'Detail',
					type: 'object',
					fields: [
						{
							name: 'title',
							title: 'Title',
							type: 'string',
							validation: Rule => Rule.required(),
						},
						{
							name: 'text',
							title: 'Text',
							type: 'simpleText',
						},
					],
					preview: {
						select: {title: 'title', text: 'text'},
						prepare: ({title, text}) => ({
							title,
							subtitle: text ? toPlainText(text) : '',
						}),
					},
				},
			],
		},
	],
	preview: {
		select: {items: 'items'},
		prepare: ({items = []}) => ({
			title: 'Details',
			subtitle: items.map(item => item.title).join(', '),
			media: <Icon />,
		}),
	},
};
