//
// === Generate Config file ===
//

const generateValues = (max, factor = 1, unit = 'px') =>
	new Array(max)
		.fill()
		.map((_, i) => i)
		.reduce((acc, val) => {
			acc[val] = `${val * factor}${unit}`;
			return acc;
		}, {});

const theme = {
	extend: {
		fontSize: {
			...generateValues(200),
		},
		lineHeight: {
			...generateValues(200),
		},
	},
};

module.exports = {
	theme,
};
