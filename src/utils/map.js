export default (array = [], mapCallback = item => item) => {
	// If array is falsy, coalesce to empty array
	if (!array) {
		array = [];
	}

	// If mapCallback is falsy, coalesce to transparent function
	if (!mapCallback) {
		mapCallback = item => item;
	}

	const mappedReturns = [];

	for (let index = 0; index < array.length; index++) {
		mappedReturns.push(mapCallback(array[index], index));
	}

	return mappedReturns;
};
