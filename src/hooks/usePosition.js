import viewport from '../utils/viewport';
import {useState, useRef, useEffect} from 'react';

const isBrowser = typeof window !== 'undefined';

export default () => {
	const ref = useRef(null);
	const [position, setPosition] = useState(null);

	useEffect(() => {
		if (!isBrowser) return;

		const onResize = () => {
			if (!ref.current) return;

			setPosition(ref.current.getBoundingClientRect());
		};

		viewport.listen(onResize);
		onResize();

		return () => viewport.unlisten(onResize);
	}, []);

	return {
		position,
		itemProps: {ref},
	};
};
