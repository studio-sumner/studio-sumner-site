export const SCREENS = {
	'2xs': 360,
	xs: 400,
	sm: 600,
	md: 800,
	lg: 1000,
	xl: 1200,
	'2xl': 1400,
	'3xl': 1600,
};

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

const config = {
	theme: {
		screens: SCREENS,
		containers: SCREENS,

		extend: {
			fontSize: {
				...generateValues(200),
			},
			lineHeight: {
				...generateValues(200),
			},
		},
	},
};

export default config;
