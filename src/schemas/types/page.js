import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '1.5em'}} symbol="📝" />;

export default {
	name: 'page',
	title: 'Page',
	icon: Icon,
	type: 'document',
	groups: [
		{name: 'main', title: 'Main', default: true},
		{name: 'seo', title: 'SEO'},
		{name: 'internal', title: 'Internal'},
	],
	fields: [
		//
		// === Main ===
		//

		{
			name: 'title',
			title: 'Title',
			type: 'string',
			group: 'main',
			validation: Rule => Rule.required(),
		},
		{
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'title',
				maxLength: 96,
			},
			group: 'main',
			validation: Rule => Rule.required(),
		},

		{
			name: 'staticBuild',
			type: 'boolean',
			title: 'Static Build',
			description:
				'If this is checked, it instructs the server to build a static copy of the page. Use this for high traffic pages and products.',
			group: 'main',
		},

		{
			type: 'pageComponentList',
			name: 'components',
			title: 'Components',
			group: 'main',
		},

		//
		// === Meta ===
		//
		{
			type: 'seo',
			name: 'seo',
			group: 'seo',
		},

		//
		// === Internal ===
		//

		{
			name: 'notes',
			title: 'Notes',
			type: 'richText',
			group: 'internal',
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
