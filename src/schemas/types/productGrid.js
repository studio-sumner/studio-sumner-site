import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '1.5em'}} symbol="🛒" />;

export default {
	name: 'productGrid',
	title: 'Product Grid',
	thumbnailUrl: '/cms/product-grid.jpg',
	icon: Icon,
	type: 'object',
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
		},
		{
			name: 'products',
			title: 'Products',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{type: 'productLanding'}],
					validation: Rule => Rule.required(),
				},
			],
			validation: Rule => Rule.min(1).max(12),
		},
	],
	preview: {
		select: {
			title: 'title',
			media: 'products.0.mainImage',
		},
	},
};
