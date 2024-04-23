import {useEffect} from 'react';
import isBrowser from '../utils/isBrowser';

const useRouterAnalytics = router => {
	// Setup Next router events
	useEffect(() => {
		const onRouteChangeComplete = url => {
			if (!isBrowser) return;

			// GA4 handles route change automatically

			// Facebook
			window.fbq && window.fbq('track', 'PageView');
		};

		router.events.on('routeChangeComplete', onRouteChangeComplete);

		// Fire initial page view
		const {asPath} = router;
		const pathname = asPath.split('?')[0].split('#')[0]; // get pathname without query or hash
		onRouteChangeComplete(pathname);

		return () => {
			router.events.off('routeChangeComplete', onRouteChangeComplete);
		};
	}, [router]);
};

export default useRouterAnalytics;
