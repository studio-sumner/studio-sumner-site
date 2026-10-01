import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '1.5em'}} symbol="🔗" />;

export default {
	name: 'cta',
	title: 'CTA',
	icon: Icon,
	type: 'array',
	of: [
		{type: 'link'},
		{type: 'pageLink'},
	],
	validation: Rule => Rule.max(1),
	preview: {
		select: {
			title: '0.title',
			pageTitle: '0.page.title',
		},
		prepare: ({title, pageTitle}) => ({
			title: title || pageTitle,
		}),
	},
};
