import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '1.5em'}} symbol="🗂️" />;

export default {
	name: 'clientsAndServices',
	title: 'Clients and Services',
	icon: Icon,
	type: 'object',
	fields: [
		{
			name: 'clientsTitle',
			title: 'Clients Title',
			type: 'string',
			validation: Rule => Rule.required(),
		},
		{
			name: 'clients',
			title: 'Clients',
			description: 'Shown in this order. Drag to reorder.',
			type: 'array',
			of: [{type: 'string'}],
		},
		{
			name: 'servicesTitle',
			title: 'Services Title',
			type: 'string',
			validation: Rule => Rule.required(),
		},
		{
			name: 'services',
			title: 'Services',
			type: 'array',
			of: [
				{
					name: 'service',
					title: 'Service',
					type: 'object',
					fields: [
						{
							name: 'name',
							title: 'Name',
							type: 'string',
							validation: Rule => Rule.required(),
						},
						{
							name: 'detail',
							title: 'Detail',
							description: 'Shown on the line below the name.',
							type: 'string',
						},
					],
					preview: {
						select: {title: 'name', subtitle: 'detail'},
					},
				},
			],
		},
	],
	preview: {
		select: {clientsTitle: 'clientsTitle', servicesTitle: 'servicesTitle'},
		prepare: ({clientsTitle, servicesTitle}) => ({
			title: 'Clients and Services',
			subtitle: [clientsTitle, servicesTitle].filter(Boolean).join(', '),
			media: <Icon />,
		}),
	},
};
