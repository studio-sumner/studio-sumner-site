import {useState, useEffect} from 'react';

export default () => {
	const [isReady, setReady] = useState(false);

	// Know if browser is ready
	useEffect(() => {
		setReady(true);
	}, []);

	return isReady;
};
