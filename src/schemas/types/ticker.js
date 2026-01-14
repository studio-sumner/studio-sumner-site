import React from 'react';
import Emoji from 'a11y-react-emoji';
import {get} from 'lodash';

const Icon = () => <Emoji style={{fontSize: '1.5em'}} symbol="🎟️" />;

export default {
	name: 'ticker',
	title: 'Ticker',
	thumbnailUrl: '/cms/ticker.jpg',
	icon: Icon,
	type: 'object',
	fields: [
		{
			name: 'description',
			title: 'Description',
			type: 'richText',
			validation: Rule => Rule.required().min(1).max(1),
		},
	],
	preview: {
		select: {
			title: 'description',
		},
		prepare: ({title}) => ({
			title: get(title, '0.children.0.text') || 'Ticker',
			media: <Icon />,
		}),
	},
};
