import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '1.5em'}} symbol="💵" />;

export default {
	name: 'price',
	title: 'Price',
	icon: Icon,
	type: 'object',
	fields: [
		{
			name: 'amount',
			title: 'Amount',
			type: 'string',
		},
		{
			name: 'currencyCode',
			title: 'Currency Code',
			type: 'string',
		},
	],
};
