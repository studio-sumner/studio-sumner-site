import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '1.5em'}} symbol="🛬" />;
const DrawerIcon = () => <Emoji style={{fontSize: '2em'}} symbol="▶️" />;
const WarningIcon = () => <Emoji style={{fontSize: '1.5em'}} symbol="⚠️" />;

export default {
	name: 'productLanding',
	title: 'Product Landing',
	icon: Icon,
	type: 'document',
	groups: [
		{name: 'main', title: 'Main', default: true},
		{name: 'meta', title: 'Meta'},
		{name: 'images', title: 'Images'},
		{name: 'search', title: 'Search'},
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
			title: 'Important!',
			description:
				'You need to sync Shopify products via the webhook for them tos how up here. This is required for cart and checkout to function properly.',
			name: 'productNote',
			type: 'note',
			options: {
				tone: 'caution',
				icon: WarningIcon,
			},
			group: 'main',
		},

		{
			name: 'product',
			title: 'Product',
			type: 'reference',
			to: [{type: 'product'}],
			group: 'main',
			validation: Rule => Rule.required(),
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
			name: 'description',
			title: 'Description',
			type: 'richText',
			group: 'meta',
		},

		//
		// === Images ===
		//

		{
			name: 'mainImage',
			type: 'image',
			title: 'Main Image',
			description:
				'This should be a vertical flush image of the "canonical size" of the product. These are generally shown multiple in a row. This is used on all product tiles and featured sections. The aspect ratio is approximately 48:35',
			validation: Rule => Rule.required(),
			group: 'images',
		},

		//
		// === Search ===
		//

		{
			name: 'hideFromSearch',
			type: 'boolean',
			title: 'Hide from Search',
			description:
				'If this is checked, this landing will never show up in search results.',
			group: 'search',
		},

		{
			name: 'searchKeywords',
			title: 'Search Keywords',
			description:
				'These keywords will be available to search by for each product',
			type: 'array',
			of: [{type: 'string'}],
			group: 'search',
		},

		//
		// === SEO ===
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
			media: 'mainImage',
		},
	},
};
