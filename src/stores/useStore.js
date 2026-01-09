import {create} from 'zustand';
import Cookies from 'js-cookie';
import config from '../../config';

import {
	getInitialState as getInitialEcommState,
	getActions as getEcommActions,
} from '../plugins/shopify/store';

const PASSWORD_EXPIRATION = config.passwordDuration;
export const PASSWORD_KEY = config.cookiePasswordKey;
export const COOKIE_KEY = config.cookieCookieDisclosureKey;

//
// === Initial State ===
//

export const getInitialState = (set, get) => ({
	// UI
	isHeaderScrolled: false,
	isDesktopMenuOpen: false,
	isMobileMenuOpen: false,
	isCartOpen: false,
	hasEnteredSitePassword: false,
	hasClosedCookies: true,
});

//
// === UI Updates ===
//

export const setMobileMenuOpen = (set, get) => isMobileMenuOpen => {
	set({isMobileMenuOpen});
};

export const setCartOpen = (set, get) => isCartOpen => {
	set({isCartOpen});
};

const completePasswordCheck = (set, get) => () => {
	Cookies.set(PASSWORD_KEY, 'true', {expires: PASSWORD_EXPIRATION});

	set({hasEnteredSitePassword: true});
};

const hydratePassword = (set, get) => () => {
	const hasEnteredSitePassword = Boolean(Cookies.get(PASSWORD_KEY));

	set({hasEnteredSitePassword});
};

const completeCookieCheck = (set, get) => () => {
	Cookies.set(COOKIE_KEY, 'true', {expires: 7});

	set({hasClosedCookies: true});
};

const hydrateCookies = (set, get) => () => {
	const hasClosedCookies = Boolean(Cookies.get(COOKIE_KEY));

	set({hasClosedCookies});
};

//
// === useStore interface ===
//

export default create((set, get) => ({
	// State
	...getInitialState(set, get),

	// ECOMMERCE
	...getInitialEcommState(set, get, config),

	// Actions
	setMobileMenuOpen: setMobileMenuOpen(set, get),
	setCartOpen: setCartOpen(set, get),
	completePasswordCheck: completePasswordCheck(set, get),
	hydratePassword: hydratePassword(set, get),
	completeCookieCheck: completeCookieCheck(set, get),
	hydrateCookies: hydrateCookies(set, get),

	// ECOMMERCE
	...getEcommActions(set, get, config),
}));
