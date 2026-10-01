import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '1.5em'}} symbol="🔗" />;

export default {
	name: 'ctaList',
	title: 'CTA List',
	icon: Icon,
	type: 'array',
	of: [
		{type: 'link'},
		{type: 'pageLink'},
	],
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
