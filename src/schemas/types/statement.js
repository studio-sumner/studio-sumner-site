import React from 'react';
import Emoji from 'a11y-react-emoji';
import {toPlainText} from '@portabletext/react';

const Icon = () => <Emoji style={{fontSize: '1.5em'}} symbol="💬" />;

export default {
	name: 'statement',
	title: 'Statement',
	icon: Icon,
	type: 'object',
	fields: [
		{
			name: 'text',
			title: 'Text',
			description:
				'The introductory statement. 24px from 768px wide, 12px on phones.',
			type: 'simpleText',
			validation: Rule => Rule.required(),
		},
	],
	preview: {
		select: {text: 'text'},
		prepare: ({text}) => ({
			title: 'Statement',
			subtitle: text ? toPlainText(text) : '',
			media: <Icon />,
		}),
	},
};
