export default (image, {maxWidth, maxHeight}) => {
	const splitUrl = (image || '').split('?');
	const notQuery = splitUrl[0];
	const query = splitUrl[1] ? `?${splitUrl[1]}` : '';

	// Use the section before the query
	const imageTokens = notQuery.split('.');

	// Take the token before the file extension and append the dimensions
	const imagePathIndex = imageTokens.length - 2;

	imageTokens[
		imagePathIndex
	] = `${imageTokens[imagePathIndex]}_${maxWidth}x${maxHeight}`;

	return `${imageTokens.join('.')}${query}`;
};
