const getColorStyle = color => {
	if (!color) return null;

	switch (color.style._type) {
		case 'color':
			return {color: color.style.hex};
		case 'ombre':
			return {
				background: color.style.style,
				'-webkit-background-clip': 'text',
				'background-clip': 'text',
				'-webkit-text-fill-color': 'transparent',
				'text-fill-color': 'transparent',
			};
		default:
			return null;
	}
};

export default getColorStyle;
