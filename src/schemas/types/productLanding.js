import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '1.5em'}} symbol="🛬" />;
const DrawerIcon = () => <Emoji style={{fontSize: '2em'}} symbol="▶️" />;

export default {
	name: 'productLanding',
	title: 'Product Landing',
	icon: Icon,
	type: 'document',
	groups: [
		{name: 'main', title: 'Main', default: true},
		{name: 'meta', title: 'Meta'},
		{name: 'shop', title: 'Shop'},
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

		{
			name: 'infoDrawers',
			title: 'Info Drawers',
			description: 'These links show up below the add to cart button.',
			type: 'array',
			of: [
				{
					name: 'drawer',
					title: 'Drawer',
					type: 'object',
					icon: DrawerIcon,
					fields: [
						{
							name: 'title',
							title: 'Title',
							type: 'string',
							validation: Rule => Rule.required(),
						},
						{
							name: 'description',
							title: 'Description',
							type: 'richText',
						},
					],
				},
				{
					name: 'drawerGlobal',
					title: 'Drawer (Global)',
					type: 'reference',
					to: [{type: 'drawerGlobal'}],
				},
			],
			group: 'meta',
		},

		//
		// === Shop ===
		//

		{
			name: 'variantDropdowns',
			title: 'Variant Dropdowns',
			type: 'array',
			of: [
				{
					name: 'dropdown',
					title: 'Dropdown',
					type: 'object',
					description:
						'Add a variant select to change the selection UI of a given variant option. Default is a radio.',
					icon: DrawerIcon,
					fields: [
						{
							name: 'optionTitle',
							title: 'Option Title (Shopify)',
							type: 'string',
							validation: Rule => Rule.required(),
						},
						{
							name: 'optionType',
							title: 'Option Type',
							type: 'string',
							initialValue: 'dropdown',
							options: {
								list: [
									{title: 'Dropdown', value: 'dropdown'},
									{title: 'Radio', value: 'radio'},
									{title: 'Button', value: 'button'},
								],
								layout: 'radio',
							},
							validation: Rule => Rule.required(),
						},
						{
							name: 'description',
							title: 'Description',
							type: 'richText',
						},
					],
					preview: {
						select: {
							title: 'optionTitle',
							subtitle: 'optionType',
						},
						prepare({title, subtitle}) {
							return {
								title,
								subtitle,
								media: <DrawerIcon />,
							};
						},
					},
				},
			],
			group: 'shop',
		},

		{
			name: 'cartAttributes',
			title: 'Cart Attributes',
			description:
				'These attributes will show up in the cart line item. Use for lead time.',
			type: 'array',
			of: [
				{
					name: 'attribute',
					title: 'Attribute',
					type: 'object',
					icon: DrawerIcon,
					fields: [
						{
							name: 'title',
							title: 'Title',
							type: 'string',
							validation: Rule => Rule.required(),
						},
						{
							name: 'value',
							title: 'Value',
							type: 'string',
							validation: Rule => Rule.required(),
						},
					],
					preview: {
						select: {
							title: 'title',
							subtitle: 'value',
						},
					},
				},
			],
			group: 'shop',
		},

		//
		// === Images ===
		//

		{
			name: 'note',
			type: 'note',
			title: 'Variant Images',
			description:
				'Variant images - used for the PDP form -  are pulled in directly from Shopify, and follow all follow the same horizontal template with square safe area.',
			group: 'images',
		},

		{
			name: 'mainImage',
			type: 'image',
			title: 'Main Image',
			description:
				'This should be a vertical flush image of the "canonical size" of the product. These are generally shown multiple in a row. This is used on all product tiles and featured sections. The aspect ratio is approximately 48:35',
			validation: Rule => Rule.required(),
			group: 'images',
		},

		{
			name: 'images',
			title: 'Images (Hero Carousel)',
			description:
				'These should be a 4:3 JPGs. These images will show up in order on the product detail page. Use the given product templates to build this.',
			type: 'array',
			of: [{type: 'image'}],
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
