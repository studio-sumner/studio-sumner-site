export default {
	type: 'block',
	styles: [
		{
			title: 'Normal',
			value: 'normal',
		},
		{
			title: 'Heading H1',
			value: 'h1',
		},
		{
			title: 'Heading H2',
			value: 'h2',
		},
		{
			title: 'Heading H3',
			value: 'h3',
		},
		{
			title: 'Heading H4',
			value: 'h4',
		},
		{
			title: 'Heading H5',
			value: 'h5',
		},
		{
			title: 'Heading H6',
			value: 'h6',
		},
	],
	marks: {
		decorators: [
			{
				title: 'Strong',
				value: 'strong',
			},
			{
				title: 'Emphasis',
				value: 'em',
			},
		],
		annotations: [
			{
				name: 'link',
				type: 'object',
				title: 'Link',
				fields: [
					{
						name: 'href', // this is for blocks only
						title: 'URL',
						type: 'url',
						validation: Rule =>
							Rule.required().uri({
								allowRelative: true,
								scheme: ['http', 'https', 'tel', 'mailto'],
							}),
					},
					{
						name: 'title',
						title: 'Title',
						type: 'string',
					},
					{
						name: 'openInNewWindow',
						title: 'Open In New Window',
						type: 'boolean',
						layout: 'checkbox',
					},
				],
			},
		],
	},
};
