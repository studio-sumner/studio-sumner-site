const reduce = require('lodash/reduce');

//
// === Project Config ===
//

const SPACING = {
	'container-mobile': '10px',
	'container-desktop': '20px',
	'gutter-mobile': '10px',
	'gutter-desktop': '20px',
};

const FONT_FAMILIES = {
	sans: [
		'Helvetica Neue LT Std',
		'-apple-system',
		'BlinkMacSystemFont',
		'Helvetica Neue',
		'Helvetica',
		'sans-serif',
	],
};

const FONT_SIZES = {
	// Sans
	'sans-14': ['14px', '18px'],
	'sans-16': ['16px', '24px'],
};

const LINE_HEIGHTS = reduce(
	FONT_SIZES,
	(lineHeights, value, key) => ({...lineHeights, [key]: value[1]}),
	{},
);

const GRID_COLUMNS = 12;
const GRID_MAX_WIDTH = 1900;

const MAX_SPACER = 21;
const MAX_Z_INDEX = 100;

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

const theme = {};

module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		'./src/app/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}',
		'./src/hooks/**/*.{js,ts,jsx,tsx}',
		'./src/layouts/**/*.{js,ts,jsx,tsx}',
		'!./node_modules',
	],
	darkMode: 'class',
	theme,
	plugins: [],
};
