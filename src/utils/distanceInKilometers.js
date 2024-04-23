const R = 6371; // km

// Converts numeric degrees to radians
function toRad(Value) {
	return (Value * Math.PI) / 180;
}

export default (lat1, lng1, lat2, lng2) => {
	const R = 6371; // km
	const dLat = toRad(lat2 - lat1);
	const dLon = toRad(lng2 - lng1);
	const lat1Rad = toRad(lat1);
	const lat2Rad = toRad(lat2);

	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.sin(dLon / 2) *
			Math.sin(dLon / 2) *
			Math.cos(lat1Rad) *
			Math.cos(lat2Rad);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const d = R * c;

	return d;
};
