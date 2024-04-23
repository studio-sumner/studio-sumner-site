import {useState, useRef} from 'react';

export default (timeout = 1000, initialState = false) => {
	const timeoutRef = useRef(null);
	const [state, setState] = useState(initialState);

	const flicker = () => {
		clearTimeout(timeoutRef.current);

		setState(!initialState);

		// Reset state on a timeout
		timeoutRef.current = setTimeout(() => {
			setState(initialState);
		}, timeout);
	};

	return [state, flicker];
};
