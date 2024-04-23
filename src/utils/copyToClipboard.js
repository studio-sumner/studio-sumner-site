export default async copyText => {
	try {
		window.navigator.clipboard.writeText(copyText);
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};
