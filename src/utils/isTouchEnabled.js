export default () => {
	if (typeof window === 'undefined') return false;

	return (
		'ontouchstart' in global ||
		navigator.maxTouchPoints > 0 ||
		navigator.msMaxTouchPoints > 0
	);
};
