export default async (req, res) => {
	res.status(200).send('User-agent: * \nAllow: /');
};
