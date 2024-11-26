import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '1.5em'}} symbol="🌹" />;
const VariantIcon = () => <Emoji style={{fontSize: '1.5em'}} symbol="🌷" />;

export default {
	name: 'product',
	title: 'Product',
	icon: Icon,
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			readOnly: true,
		},
		{
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			readOnly: true,
		},
		{
			name: 'createdAt',
			title: 'Created At',
			type: 'string',
			readOnly: true,
		},
		{
			name: 'deleted',
			title: 'Deleted In Shopify',
			type: 'boolean',
			readOnly: true,
		},
		{
			name: 'productId',
			title: 'Product ID',
			readOnly: true,
			type: 'number',
		},
		{
			name: 'tags',
			title: 'Tags',
			readOnly: true,
			type: 'array',
			of: [{type: 'string'}],
		},
		{
			name: 'price',
			title: 'Price',
			type: 'price',
			readOnly: true,
		},
		{
			name: 'cents',
			title: 'Price (Cents)',
			type: 'number',
			readOnly: true,
		},
		{
			name: 'compareAtCents',
			title: 'Compare At Price (Cents)',
			type: 'number',
			readOnly: true,
		},
		{
			name: 'options',
			title: 'Options',
			type: 'array',
			of: [{type: 'productVariantOption'}],
			readOnly: true,
		},
		{
			title: 'Variants',
			name: 'variants',
			type: 'array',
			readOnly: true,
			of: [
				{
					icon: VariantIcon,
					type: 'reference',
					to: [{type: 'productVariant'}],
				},
			],
		},
		{
			name: 'image',
			title: 'Image',
			type: 'productImage',
			readOnly: true,
		},
		{
			name: 'images',
			title: 'Images',
			type: 'array',
			of: [{type: 'productImage'}],
			readOnly: true,
		},
		{
			name: 'requiresSellingPlan',
			title: 'Requires Selling Plan',
			type: 'boolean',
			readOnly: true,
		},
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'slug.current',
		},
		prepare({title, subtitle}) {
			return {
				title,
				subtitle,
				media: <Icon />,
			};
		},
	},
};
