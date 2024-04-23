import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '1.5em'}} symbol="🔗" />;

export default {
	name: 'redirect',
	title: 'Redirect',
	icon: Icon,
	type: 'document',
	fields: [
		{
			name: 'fromPath',
			title: 'From Path',
			type: 'string',
			description:
				'Old slug being redirected FROM. Use preceding slash (e.g. "/help")',
			validation: Rule => Rule.required(),
		},
		{
			name: 'toPath',
			title: 'To Path',
			type: 'string',
			description:
				'New slug being redirected TO. Use preceding slash (e.g. "/support")',
			validation: Rule => Rule.required(),
		},
		{
			name: 'permanent',
			title: 'Permanent',
			type: 'boolean',
			description:
				'If checked, will use the 308 status code which instructs clients/search engines to cache the redirect forever, if false will use the 307 status code which is temporary and is not cached.',
		},
	],
	preview: {
		select: {
			title: 'toPath',
			from: 'fromPath',
		},
		prepare(selection) {
			const {title, from} = selection;
			return {
				title: `${from} ➡️ ${title}`,
			};
		},
	},
};
