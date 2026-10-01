import '../styles/main.css';

import React, {useEffect, Fragment} from 'react';
import FramerMotionConfig from '../components/FramerMotionConfig';
import {m as motion, AnimatePresence} from 'framer-motion';
import ease from '../config/ease';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CookieBanner from '../components/CookieBanner';
import PromoBanner from '../components/PromoBanner';
import PasswordScreen from '../components/PasswordScreen';
import AppLayout from '../layouts/AppLayout';
import useStore from '../stores/useStore';
import isBrowser from '../utils/isBrowser';
import useLoadingCursor from '../hooks/useLoadingCursor';
import useScrollRestoration from '../hooks/useScrollRestoration';
import useRouterAnalytics from '../hooks/useRouterAnalytics';
import useHashScroll from '../hooks/useHashScroll';

const SCROLL_BUFFER = 60 + 20; // height + pad

const ROUTE_VARIANTS = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
		transition: {
			ease: ease.appear,
			duration: 400 / 1000,
		},
	},
	exit: {
		opacity: 0,
		transition: {
			ease: ease.appear,
			duration: 600 / 1000,
		},
	},
};

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
	} = pageProps;

	const {header, footer, cookieBanner, promoBanner} = layout;

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

	const animatedRoutes = (
		<AnimatePresence mode="wait">
			<motion.div key={pathname} {...ROUTE_VARIANTS}>
				<Component {...pageProps} />
				<Footer {...footer} />
			</motion.div>
		</AnimatePresence>
	);

	const animatedLayout = (
		<AnimatePresence mode="wait">
			<motion.div key={layoutTemplate} {...ROUTE_VARIANTS}>
				<AppLayout layout={layoutTemplate} {...layoutProps}>
					{animatedRoutes}
				</AppLayout>
			</motion.div>
		</AnimatePresence>
	);

	const siteFragment = !showPasswordProtection && (
		<FramerMotionConfig>
			{promoBannerRibbon}
			<Header {...header} />
			{cookieBannerRibbon}
			{animatedLayout}
		</FramerMotionConfig>
	);

	return (
		<Fragment>
			{passwordFragment}
			{siteFragment}
		</Fragment>
	);
};

export default App;
