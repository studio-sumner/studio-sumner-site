import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '1.5em'}} symbol="🎨" />;

export default {
	name: 'productVariantOptionValue',
	title: 'Product Variant Option Value',
	icon: Icon,
	type: 'object',
	fields: [
		{
			name: 'name',
			title: 'Name',
			type: 'string',
			readOnly: true,
		},
	],
	preview: {
		select: {
			title: 'name',
		},
	},
};
