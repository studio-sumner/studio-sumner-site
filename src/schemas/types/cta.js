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

		// ECOMMERCE
		{type: 'productLink'},
		{type: 'collectionLink'},
	],
	validation: Rule => Rule.max(1),
	preview: {
		select: {
			title: '0.title',
			collectionTitle: '0.collection.title',
			productTitle: '0.productLanding.title',
			pageTitle: '0.page.title',
		},
		prepare: ({title, pageTitle, productTitle, collectionTitle}) => ({
			title: title || pageTitle || productTitle || collectionTitle,
		}),
	},
};
