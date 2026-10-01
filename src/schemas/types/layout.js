import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '1.5em'}} symbol="🎨" />;

export default {
	name: 'layout',
	title: 'Layout',
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
			name: 'homepage',
			title: 'Homepage',
			description: 'Select the page you want to be the homepage.',
			type: 'reference',
			to: [{type: 'page'}],
			validation: Rule => Rule.required(),
		},
		{
			name: 'notFoundPage',
			title: 'Not Found Page',
			description:
				'Select the page you want to be the 404/500 error page.',
			type: 'reference',
			to: [{type: 'notFound'}],
			validation: Rule => Rule.required(),
		},
		{
			name: 'header',
			title: 'Header',
			type: 'reference',
			to: [{type: 'header'}],
			validation: Rule => Rule.required(),
		},
		{
			name: 'footer',
			title: 'Footer',
			type: 'reference',
			to: [{type: 'footer'}],
			validation: Rule => Rule.required(),
		},

		{
			name: 'cookieBanner',
			title: 'Cookie Banner',
			type: 'reference',
			to: [{type: 'cookieBanner'}],
		},
		{
			name: 'promoBanner',
			title: 'Promo Banner',
			type: 'reference',
			to: [{type: 'promoBanner'}],
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
