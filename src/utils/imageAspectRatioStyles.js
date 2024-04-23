export default aspectRatio => ({
	height: 0,
	paddingBottom: `${1 / aspectRatio * 100}%`,
});