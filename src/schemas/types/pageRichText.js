import React from 'react';
import Emoji from 'a11y-react-emoji';
import {get} from 'lodash';

const Icon = () => <Emoji style={{fontSize: '1.5em'}} symbol="📰" />;

export default {
	name: 'pageRichText',
	title: 'Page (Rich Text)',
	thumbnailUrl: '/cms/page-rich-text.jpg',
	icon: Icon,
	type: 'object',
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
		},
		{
			name: 'description',
			title: 'Description',
			type: 'richText',
		},
	],
};
