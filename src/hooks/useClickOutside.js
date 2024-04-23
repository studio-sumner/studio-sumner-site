import {useRef, useEffect} from 'react';

export default (handler = () => {}) => {
	const ref = useRef(null);

	useEffect(
		() => {
			const listener = event => {
				// Do nothing if clicking ref's element or descendent elements
				if (!ref.current || ref.current.contains(event.target)) {
					return;
				}

				handler(event);
			};

			document.addEventListener('click', listener);
			document.addEventListener('touchend', listener);

			return () => {
				document.removeEventListener('click', listener);
				document.removeEventListener('touchend', listener);
			};
		},
		// Add ref and handler to effect dependencies
		// It's worth noting that because passed in handler is a new ...
		// ... function on every render that will cause this effect ...
		// ... callback/cleanup to run every render. It's not a big deal ...
		// ... but to optimize you can wrap handler in useCallback before ...
		// ... passing it into this hook.
		[ref, handler],
	);

	return [ref];
};
