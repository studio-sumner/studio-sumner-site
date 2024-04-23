const col = {
	name: 'tableCol',
	title: 'Column',
	type: 'object',
	fields: [
		{
			name: 'text',
			title: 'Text',
			type: 'text',
		},
		{
			name: 'textalign',
			title: 'Alignment',
			type: 'string',
			initialValue: 'center',
			options: {
				list: ['left', 'center', 'right'],
			},
		},
		{
			name: 'colspan',
			title: 'Column Span',
			type: 'number',
		},
	],
	preview: {
		select: {
			title: 'text',
		},
	},
};

const row = {
	name: 'tableRow',
	title: 'Row',
	type: 'object',
	fields: [
		{
			name: 'columns',
			title: 'Columns',
			type: 'array',
			of: [col],
		},
	],
	preview: {
		select: {
			title: 'columns.0.text',
		},
	},
};

const header = {
	name: 'tableHeader',
	title: 'Header',
	type: 'object',
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
		},
		{
			name: 'textalign',
			title: 'Alignment',
			type: 'string',
			initialValue: 'center',
			options: {
				list: ['left', 'center', 'right'],
			},
		},
		{
			name: 'colspan',
			title: 'Column Span',
			type: 'number',
		},
	],
	preview: {
		select: {
			title: 'title',
		},
	},
};

export default {
	type: 'object',
	name: 'table',
	title: 'Table',
	fields: [
		{
			name: 'headers',
			title: 'Column Headers',
			type: 'array',
			of: [header],
		},
		{
			name: 'rows',
			title: 'Rows',
			type: 'array',
			of: [row],
		},
	],
	preview: {
		select: {
			title: 'headers.0.title',
			content: 'rows.0.columns.0.text',
		},
		prepare: ({title, content}) => ({title: title || content}),
	},
};
