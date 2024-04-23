import {useEffect} from 'react';
import scrollTo from '../utils/scrollTo';
import getDistanceFromTop from '../utils/getDistanceFromTop';

const useHashScroll = (router, headerHeight) => {
	const {asPath} = router;
	const hash = asPath.split('#')[1];

	const handleHashChange = hash => {
		if (!hash) return;

		setTimeout(() => {
			const activeEl = document.getElementById(hash);

			if (activeEl) {
				scrollTo(getDistanceFromTop(activeEl) - headerHeight);
			}
		}, 1000);
	};

	// Handle hash change
	useEffect(() => {
		handleHashChange(hash);
	}, [hash]);
};

export default useHashScroll;
