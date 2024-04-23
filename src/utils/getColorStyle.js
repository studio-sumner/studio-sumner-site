const getColorStyle = color => {
	if (!color) return null;

	switch (color.style._type) {
		case 'color':
			return {background: color.style.hex};
		case 'ombre':
			return {background: color.style.style};
		default:
			return null;
	}
};

export default getColorStyle;
