import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '1.5em'}} symbol="⚙️" />;

export default {
	name: 'globalConfig',
	_id: 'globalConfig',
	title: 'Global Config',
	icon: Icon,
	type: 'document',
	groups: [
		{name: 'main', title: 'Main', default: true},
		{name: 'password', title: 'Password'},
		{name: 'seo', title: 'SEO'},
	],
	fields: [
		//
		// === Main ===
		//

		{
			name: 'layout',
			title: 'Layout',
			description:
				'Select the active layout. This includes homepage, header, and footer',
			type: 'reference',
			to: [{type: 'layout'}],
			validation: Rule => Rule.required(),
			group: 'main',
		},

		//
		// === Password ===
		//

		{
			name: 'enablePassword',
			title: 'Enable Site Password',
			type: 'boolean',
			group: 'password',
		},
		{
			name: 'password',
			title: 'Password',
			type: 'string',
			group: 'password',
		},

		//
		// === SEO ===
		//

		{
			type: 'seo',
			name: 'seo',
			title: 'SEO',
			group: 'seo',
		},
	],
	preview: {
		prepare: () => ({title: 'Global Config'}),
	},
};
