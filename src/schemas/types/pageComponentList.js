import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '1.5em'}} symbol="🚧" />;

export const components = [
	// Utility
	{type: 'iframeEmbed'},
];

export default {
	name: 'pageComponentList',
	title: 'Components',
	icon: Icon,
	type: 'array',
	of: [
		{
			name: 'globalComponentList',
			title: 'Global Component List',
			type: 'reference',
			to: [{type: 'globalComponentList'}],
		},
		...components,
	],
};
