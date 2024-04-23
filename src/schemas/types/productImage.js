import React from 'react';
import Emoji from 'a11y-react-emoji';
import shopifyImageUrl from '../../utils/shopifyImageUrl';

const Icon = () => <Emoji style={{fontSize: '1.5em'}} symbol="📸" />;

export default {
	name: 'productImage',
	title: 'Product Image',
	icon: Icon,
	type: 'object',
	fields: [
		{
			name: 'src',
			title: 'Image Src',
			type: 'string',
			readOnly: true,
		},
		{
			name: 'alt',
			title: 'Alt',
			type: 'string',
			readOnly: true,
		},
		{
			name: 'height',
			title: 'Height',
			type: 'number',
			readOnly: true,
		},
		{
			name: 'width',
			title: 'Width',
			type: 'number',
			readOnly: true,
		},
		{
			name: 'admin_graphql_api_id',
			title: 'Admin GraphQL API ID',
			type: 'string',
			readOnly: true,
		},
		{
			name: 'product_id',
			title: 'Product ID',
			type: 'number',
			readOnly: true,
		},
		{
			name: 'variant_ids',
			title: 'Variant IDs',
			type: 'array',
			of: [{type: 'number'}],
			readOnly: true,
		},
	],
	preview: {
		select: {
			title: 'alt',
			subtitle: 'admin_graphql_api_id',
			src: 'src',
		},
		prepare: ({title, subtitle, src}) => ({
			title: title ? title : 'Untitled',
			subtitle,
			media: src ? (
				<img
					src={shopifyImageUrl(src, {maxWidth: 100, maxHeight: 100})}
				/>
			) : (
				<Icon />
			),
		}),
	},
};
