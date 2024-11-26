import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '1.5em'}} symbol="🌷" />;

export default {
	name: 'productVariant',
	title: 'Product Variant',
	icon: Icon,
	type: 'document',
	fields: [
		{
			name: 'productTitle',
			title: 'Product Title',
			type: 'string',
			readOnly: true,
		},
		{
			name: 'variantTitle',
			title: 'Variant Title',
			type: 'string',
			readOnly: true,
		},
		{
			name: 'variantId',
			title: 'Variant ID',
			type: 'number',
			readOnly: true,
		},
		{
			name: 'productId',
			title: 'Product ID',
			type: 'number',
			readOnly: true,
		},
		{
			name: 'sku',
			title: 'SKU',
			type: 'string',
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
			name: 'inventoryQuantity',
			title: 'Inventory Quantity',
			type: 'number',
			readOnly: true,
		},
		{
			name: 'option1',
			title: 'Option #1',
			type: 'string',
			readOnly: true,
		},
		{
			name: 'option2',
			title: 'Option #2',
			type: 'string',
			readOnly: true,
		},
		{
			name: 'option3',
			title: 'Option #3',
			type: 'string',
			readOnly: true,
		},
		{
			name: 'image',
			title: 'Image',
			type: 'productImage',
			readOnly: true,
		},
		{
			name: 'sellingPlanOptions',
			title: 'Selling Plan Options',
			type: 'array',
			readOnly: true,
			of: [{type: 'productVariantSellingPlanOption'}],
		},
	],
	preview: {
		select: {
			title: 'variantTitle',
			subtitle: 'productTitle',
		},
	},
};
