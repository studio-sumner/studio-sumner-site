import {useState, useEffect} from 'react';
import isBrowser from '../utils/isBrowser';
import viewport from '../utils/viewport';

export default () => {
	const [height, setHeight] = useState(0);
	const [width, setWidth] = useState(0);

	useEffect(() => {
		if (!isBrowser) return;

		const onResize = () => {
			const body = document.body;
			const html = document.documentElement;

			setHeight(
				Math.max(
					body.scrollHeight,
					body.offsetHeight,
					html.clientHeight,
					html.scrollHeight,
					html.offsetHeight,
				),
			);

			setWidth(window.innerWidth);
		};

		viewport.listen(onResize);
		onResize();

		return () => {
			viewport.unlisten(onResize);
		};
	}, []);

	return {height, width};
};
