import React from 'react';
import Emoji from 'a11y-react-emoji';
import AdminPageComponentListField from '../../components/AdminPageComponentListField';

const Icon = () => <Emoji style={{fontSize: '1.5em'}} symbol="🚧" />;

export const components = [
	// Marketing
	{type: 'fullWidthHeroCarousel'},
	{type: 'productGrid'},
	{type: 'alternatingProductFeatures'},

	// Utility
	{type: 'iframeEmbed'},
];

export default {
	name: 'pageComponentList',
	title: 'Components',
	icon: Icon,
	type: 'array',
	of: [
		...components,
		{
			name: 'globalComponentList',
			title: 'Global Component List',
			type: 'reference',
			to: [{type: 'globalComponentList'}],
		},
	],

	components: {
		input: AdminPageComponentListField,
	},

	//
	// === Optional default Sanity grouping
	//

	// options: {
	// 	insertMenu: {
	// 		filter: 'auto',
	// 		groups: [
	// 			{
	// 				name: 'intro',
	// 				title: 'Intro',
	// 				of: ['heroFullWidthImage'],
	// 			},
	// 			{
	// 				name: 'utilities',
	// 				title: 'Utilities',
	// 				of: ['iframeEmbed', 'globalComponentList'],
	// 			},
	// 		],
	// 	},
	// },
};
