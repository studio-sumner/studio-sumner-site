// Plain paragraphs with links only, for the About page's short copy. Shift+Enter adds a line break.
export default {
	type: 'block',
	styles: [{title: 'Normal', value: 'normal'}],
	lists: [],
	marks: {
		decorators: [],
		annotations: [
			{
				name: 'link',
				type: 'object',
				title: 'Link',
				fields: [
					{
						name: 'href',
						title: 'URL',
						type: 'url',
						validation: Rule =>
							Rule.required().uri({
								allowRelative: true,
								scheme: ['http', 'https', 'tel', 'mailto'],
							}),
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
