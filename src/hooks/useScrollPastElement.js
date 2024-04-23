import viewport from '../utils/viewport';
import getViewportPosition from '../utils/getViewportPosition';
import {useEffect, useState} from 'react';

export default (elSelector, fallbackThreshold = 0, setCallback = () => {}) => {
	const [isPastThreshold, setPastThreshold] = useState(false);

	useEffect(() => {
		const onScroll = () => {
			const el = document.querySelector(elSelector);

			if (el) {
				const position = el.getBoundingClientRect();

				if (position.bottom < 0) {
					setPastThreshold(true);
				} else {
					setPastThreshold(false);
				}
			} else {
				const position = getViewportPosition();

				if (position >= fallbackThreshold && !isPastThreshold) {
					setPastThreshold(true);
				} else if (position < fallbackThreshold && isPastThreshold) {
					setPastThreshold(false);
				}
			}
		};

		viewport.listen(onScroll);

		return () => {
			viewport.unlisten(onScroll);
		};
	}, [elSelector, fallbackThreshold, isPastThreshold]);

	useEffect(() => {
		setCallback(isPastThreshold);
	}, [isPastThreshold]);

	return isPastThreshold;
};
