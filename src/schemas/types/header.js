import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '1.5em'}} symbol="🧢" />;

export default {
	name: 'header',
	title: 'Header',
	icon: Icon,
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			description: 'Only used internally in the CMS',
			validation: Rule => Rule.required(),
		},

		{
			name: 'siteTitle',
			title: 'Site Title',
			type: 'string',
			description: 'Shown after the mark at the top left.',
			validation: Rule => Rule.required(),
		},

		{
			name: 'navItems',
			title: 'Navigation',
			description:
				'Flush right. The item for the current page shows in black; the others in grey. Items without a page or URL show as plain text.',
			type: 'array',
			of: [
				{
					name: 'navItem',
					title: 'Navigation Item',
					type: 'object',
					fields: [
						{
							name: 'title',
							title: 'Title',
							type: 'string',
							validation: Rule => Rule.required(),
						},
						{
							name: 'page',
							title: 'Page',
							type: 'reference',
							to: [{type: 'page'}],
						},
						{
							name: 'url',
							title: 'URL',
							description: 'Used when no page is selected.',
							type: 'url',
							validation: Rule =>
								Rule.uri({
									allowRelative: true,
									scheme: ['http', 'https', 'mailto'],
								}),
						},
					],
					preview: {
						select: {
							title: 'title',
							pageTitle: 'page.title',
							url: 'url',
						},
						prepare: ({title, pageTitle, url}) => ({
							title,
							subtitle: pageTitle || url || 'No link',
						}),
					},
				},
			],
		},
	],
	preview: {
		select: {
			title: 'title',
		},
		prepare: selection => ({
			...selection,
			media: <Icon />,
		}),
	},
};
