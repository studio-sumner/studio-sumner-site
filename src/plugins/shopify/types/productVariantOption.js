import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '1.5em'}} symbol="🎨" />;

export default {
	name: 'productVariantOption',
	title: 'Product Variant Options',
	icon: Icon,
	type: 'object',
	fields: [
		{
			name: 'name',
			title: 'Name',
			type: 'string',
			readOnly: true,
		},
		{
			name: 'position',
			title: 'Position',
			type: 'number',
			readOnly: true,
		},
		{
			name: 'values',
			title: 'Values',
			type: 'array',
			of: [{type: 'productVariantOptionValue'}],
			readOnly: true,
		},
	],
	preview: {
		select: {
			title: 'name',
		},
	},
};
