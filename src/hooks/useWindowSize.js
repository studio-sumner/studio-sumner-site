import {useState, useEffect} from 'react';
import isBrowser from '../utils/isBrowser';

export default () => {
	const [innerHeight, setInnerHeight] = useState(0);
	const [innerWidth, setInnerWidth] = useState(0);

	useEffect(() => {
		if (!isBrowser) return;

		const onResize = () => {
			setInnerHeight(window.innerHeight);
			setInnerWidth(window.innerWidth);
		};

		window.addEventListener('resize', onResize);
		onResize();

		return () => {
			window.removeEventListener('resize', onResize);
		};
	}, []);

	return {innerWidth, innerHeight};
};
