import '@fontsource-variable/lexend-mega';
import '../styles/main.css';

import React, {useEffect, Fragment} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GridOverlay from '../components/GridOverlay';
import CookieBanner from '../components/CookieBanner';
import PromoBanner from '../components/PromoBanner';
import PasswordScreen from '../components/PasswordScreen';
import AppLayout from '../layouts/AppLayout';
import {countComponents} from '../components/PageComponentList';
import useStore from '../stores/useStore';
import isBrowser from '../utils/isBrowser';
import useLoadingCursor from '../hooks/useLoadingCursor';
import useScrollRestoration from '../hooks/useScrollRestoration';
import useRouterAnalytics from '../hooks/useRouterAnalytics';
import useHashScroll from '../hooks/useHashScroll';

const SCROLL_BUFFER = 16;

if (isBrowser) {
	window.store = useStore;
}

const App = ({Component, pageProps, router}) => {
	const hydratePassword = useStore(s => s.hydratePassword);
	const hydrateCookies = useStore(s => s.hydrateCookies);
	const completePasswordCheck = useStore(s => s.completePasswordCheck);
	const hasEnteredSitePassword = useStore(s => s.hasEnteredSitePassword);
	const setMobileMenuOpen = useStore(s => s.setMobileMenuOpen);

	const {asPath} = router;
	const pathname = asPath.split('?')[0].split('#')[0]; // get pathname without query or hash

	const {
		layoutTemplate = 'Layout',
		layout = {},
		layoutProps = {},
		enablePassword,
		password,
		_id: currentPageId,
		components,
	} = pageProps;

	const {header, footer, homepageId, cookieBanner, promoBanner} = layout;

	const showPasswordProtection = Boolean(
		enablePassword && !hasEnteredSitePassword,
	);

	// Kick off router events
	useLoadingCursor(router);
	useRouterAnalytics(router);
	useScrollRestoration(router);
	useHashScroll(router, SCROLL_BUFFER);

	// Kick off side effects
	useEffect(() => {
		hydratePassword();
		hydrateCookies();
	}, []);

	// Close menus when changing routes
	useEffect(() => {
		setMobileMenuOpen(false);
	}, [pathname]);

	// Site credit on load
	useEffect(() => {
		// Code credit
		console.groupCollapsed('Site Credits');
		console.log('Sprout by Gardener NYC https://www.gardener.nyc');
		console.groupEnd();
	}, []);

	const passwordFragment = showPasswordProtection && (
		<PasswordScreen
			password={password}
			completePasswordCheck={completePasswordCheck}
		/>
	);

	const cookieBannerRibbon = cookieBanner && (
		<CookieBanner {...cookieBanner} />
	);

	const promoBannerRibbon = promoBanner && <PromoBanner {...promoBanner} />;

	// Sections rise in on load, 80ms apart: header, page components, footer.
	const siteFragment = !showPasswordProtection && (
		<Fragment>
			{promoBannerRibbon}
			<main
				key={pathname}
				className="min-h-screen bg-background px-4 py-4 text-sm text-foreground md:px-6">
				<Header
					{...header}
					homepageId={homepageId}
					currentPageId={currentPageId}
				/>
				<AppLayout layout={layoutTemplate} {...layoutProps}>
					<Component {...pageProps} />
				</AppLayout>
				<Footer
					{...footer}
					riseStep={countComponents(components) + 1}
				/>
				<GridOverlay />
			</main>
			{cookieBannerRibbon}
		</Fragment>
	);

	return (
		<Fragment>
			{passwordFragment}
			{siteFragment}
		</Fragment>
	);
};

export default App;
