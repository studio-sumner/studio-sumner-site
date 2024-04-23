export default aspectRatio => {
	const [width, height] = aspectRatio.split(':').map(s => Number(s));

	return {
		height: 0,
		paddingBottom: `${(height / width) * 100}%`,
	};
};
