import React from 'react';
import Emoji from 'a11y-react-emoji';
import {BackgroundMediaIcon} from './backgroundMedia';

const Icon = () => <Emoji style={{fontSize: '1.5em'}} symbol="🆘" />;

export default {
	name: 'notFound',
	title: '404 Page',
	icon: Icon,
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: Rule => Rule.required(),
		},
		{
			name: 'cta',
			title: 'CTA',
			type: 'cta',
			validation: Rule => Rule.required(),
		},
	],
	preview: {
		select: {
			title: 'title',
		},
	},
};
