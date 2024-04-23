import React from 'react';
import Emoji from 'a11y-react-emoji';

const OmbreIcon = ({
	background = 'linear-gradient(to bottom, #E6E7E8, #F7F0E8',
}) => (
	<div
		style={{
			height: '1.5em',
			width: '1.5em',
			background,
			borderRadius: '1.5em',
		}}
	/>
);

const ColorIcon = ({background = 'skyblue'}) => (
	<div
		style={{
			height: '1.5em',
			width: '1.5em',
			background,
			borderRadius: '1.5em',
		}}
	/>
);

const Icon = () => <Emoji style={{fontSize: '1.5em'}} symbol="🎨" />;

export default {
	name: 'colorStyle',
	title: 'Color Style',
	icon: Icon,
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: Rule => Rule.required(),
		},
		{
			name: 'style',
			title: 'Style',
			icon: Icon,
			type: 'array',
			of: [
				{
					name: 'color',
					title: 'Color',
					icon: ColorIcon,
					type: 'color',
				},
				{
					name: 'ombre',
					title: 'Ombre',
					type: 'object',
					icon: OmbreIcon,
					fields: [
						{
							name: 'style',
							title: 'Style',
							type: 'string',
							description:
								'This is a gradient value, like `linear-gradient(180deg, #E6E7E8 0%, #F7F0E8 100%).',
						},
					],
					preview: {
						select: {
							title: 'style',
						},
						prepare: ({title}) => ({
							title,
							media: <OmbreIcon background={title} />,
						}),
					},
				},
			],
			validation: Rule => Rule.required().min(1).max(1),
		},
	],
	preview: {
		select: {
			title: 'title',
			styles: 'style',
		},
		prepare: ({title, styles}) => {
			let style = styles[0];
			let media = <Icon />;
			let subtitle;

			if (style) {
				switch (style._type) {
					case 'ombre':
						media = <OmbreIcon background={style.style} />;
						subtitle = style.style;
						break;
					case 'color':
						media = <ColorIcon background={style.hex} />;
						subtitle = style.hex;
						break;
				}
			}

			return {
				title,
				subtitle,
				media,
			};
		},
	},
};
