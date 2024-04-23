import {useEffect, useState, useRef} from 'react';
import viewport from '../utils/viewport';

export default (scrollThreshold = 1) => {
	const [hasSeen, setHasSeen] = useState(false);
	const ref = useRef();

	useEffect(() => {
		const onScroll = () => {
			if (!ref.current) return;

			const position = ref.current.getBoundingClientRect();
			const {innerHeight} = window;

			if (position.top <= innerHeight * scrollThreshold) {
				setHasSeen(true);
				viewport.unlisten(onScroll);
			}
		};

		viewport.listen(onScroll);
		onScroll();

		return () => viewport.unlisten(onScroll);
	}, [ref]);

	return {
		ref,
		hasSeen,
	};
};
