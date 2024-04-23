import viewport from '../utils/viewport';
import getViewportPosition from '../utils/getViewportPosition';
import {useEffect, useState} from 'react';

export default (threshold = 0, setCallback = () => {}) => {
	const [isPastThreshold, setPastThreshold] = useState(false);

	useEffect(() => {
		const onScroll = () => {
			const position = getViewportPosition();
			if (position >= threshold && !isPastThreshold) {
				setPastThreshold(true);
			} else if (position < threshold && isPastThreshold) {
				setPastThreshold(false);
			}
		};

		viewport.listen(onScroll);

		return () => {
			viewport.unlisten(onScroll);
		};
	}, [threshold, isPastThreshold]);

	useEffect(() => {
		setCallback(isPastThreshold);
	}, [isPastThreshold]);

	return isPastThreshold;
};
