import {useEffect, useState} from 'react';

const useLoadingCursor = router => {
	const [isLoading, setLoading] = useState(false);

	// Set cursor based on loading state
	useEffect(() => {
		if (isLoading) {
			window.document.documentElement.classList.add('cursor-loading');
		} else {
			window.document.documentElement.classList.remove('cursor-loading');
		}
	}, [isLoading]);

	// Setup Next router events
	useEffect(() => {
		const onRouteChangeStart = url => {
			// Bail if we're just changing a URL parameter
			if (
				url.indexOf('?') > -1 &&
				url.split('?')[0] === router.asPath.split('?')[0]
			)
				return;

			// Otherwise, start loading
			setLoading(true);
		};

		const onRouteChangeComplete = url => {
			setLoading(false);
		};

		const onRouteChangeError = url => {
			setLoading(false);
			console.log(`Error changing to URL: ${url}`);
		};

		router.events.on('routeChangeStart', onRouteChangeStart);
		router.events.on('routeChangeComplete', onRouteChangeComplete);
		router.events.on('routeChangeError', onRouteChangeError);

		return () => {
			router.events.off('routeChangeStart', onRouteChangeStart);
			router.events.off('routeChangeComplete', onRouteChangeComplete);
			router.events.off('routeChangeError', onRouteChangeError);
		};
	}, []);
};

export default useLoadingCursor;
