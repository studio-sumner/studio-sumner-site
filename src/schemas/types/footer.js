import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '1.5em'}} symbol="👟" />;
const ColumnIcon = () => <Emoji style={{fontSize: '1.5em'}} symbol="▶️" />;

export default {
	name: 'footer',
	title: 'Footer',
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
			name: 'footerColumns',
			title: 'Footer Columns',
			type: 'array',
			of: [
				{
					name: 'footerColumn',
					title: 'Footer Column',
					icon: ColumnIcon,
					type: 'object',
					fields: [
						{
							name: 'title',
							title: 'Title',
							type: 'string',
							validation: Rule => Rule.required(),
						},
						{
							name: 'links',
							title: 'Links',
							type: 'ctaList',
						},
					],
				},
			],
		},

		{
			name: 'newsletterTitle',
			title: 'Newsletter Title',
			type: 'string',
			validation: Rule => Rule.required(),
		},
		{
			name: 'klaviyoListId',
			title: 'Klaviyo List ID',
			type: 'string',
			validation: Rule => Rule.required(),
		},
		{
			name: 'klaviyoSourceId',
			title: 'Klaviyo Source ID',
			type: 'string',
			validation: Rule => Rule.required(),
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
