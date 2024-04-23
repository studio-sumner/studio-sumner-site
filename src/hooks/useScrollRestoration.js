import {useRef, useEffect} from 'react';
import queryString from 'query-string';

const ROUTE_TRANSITION = 600;

const useScrollRestoration = router => {
	const scrollPositions = useRef({});
	const isBack = useRef(false);

	// Setup Next router events
	useEffect(() => {
		window.history.scrollRestoration = 'manual';

		const resetScroll = url => {
			const pathname = url.split('?')[0].split('#')[0]; // get pathname without query or hash

			// Reset scroll if we're going back
			if (isBack.current && scrollPositions.current[pathname]) {
				window.scroll({
					top: scrollPositions.current[pathname],
					behavior: 'auto',
				});

				isBack.current = false;
				return;
			}

			// Avoid scroll reset if we dictate so
			const query = queryString.parse(window.location.search);
			const avoidScrollReset = Boolean(
				query && query.s && query.s === '0',
			);

			if (avoidScrollReset) return;

			// Reset to top otherwise
			setTimeout(() => {
				window.scrollTo(0, 0);
			}, ROUTE_TRANSITION);
		};

		router.beforePopState(() => {
			isBack.current = true;
			return true;
		});

		const onRouteChangeStart = newUrl => {
			const {asPath} = router;
			const pathname = asPath.split('?')[0].split('#')[0]; // get pathname without query or hash

			scrollPositions.current[pathname] = window.scrollY;
		};

		const onRouteChangeComplete = url => {
			resetScroll(url);
		};

		router.events.on('routeChangeStart', onRouteChangeStart);
		router.events.on('routeChangeComplete', onRouteChangeComplete);

		return () => {
			router.events.off('routeChangeStart', onRouteChangeStart);
			router.events.off('routeChangeComplete', onRouteChangeComplete);
		};
	}, [router]);
};

export default useScrollRestoration;
