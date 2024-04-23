import {create} from 'zustand';
import Shopify from '../api/shopifyStorefront';
import cookie from 'js-cookie';
import config from '../../config';

export const SHOPIFY_CART_KEY = config.cookieCartKey;
export const PASSWORD_KEY = config.cookiePasswordKey;
export const COOKIE_KEY = config.cookieCookieDisclosureKey;
export const COUNTRY_KEY = config.cookieCountryKey;

const PASSWORD_EXPIRATION = config.passwordDuration;
const DEFAULT_COUNTRY_ID = config.defaultCountryId;

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

	// Cart
	isHydratingCart: false,
	isUpdatingCart: false,
	isNavigatingToCheckout: false,
	cartId: null,
	cart: null,
	availableCountries: [],
	isHydratingAvailableCountries: false,
	activeCountryId: DEFAULT_COUNTRY_ID, // default to USA currency
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
	cookie.set(PASSWORD_KEY, 'true', {expires: PASSWORD_EXPIRATION});

	set({hasEnteredSitePassword: true});
};

const hydratePassword = (set, get) => () => {
	const hasEnteredSitePassword = Boolean(cookie.get(PASSWORD_KEY));

	set({hasEnteredSitePassword});
};

const completeCookieCheck = (set, get) => () => {
	cookie.set(COOKIE_KEY, 'true', {expires: 7});

	set({hasClosedCookies: true});
};

const hydrateCookies = (set, get) => () => {
	const hasClosedCookies = Boolean(cookie.get(COOKIE_KEY));

	set({hasClosedCookies});
};

//
// === Cart ===
//

export const fetchCart = (set, get) => async () => {
	const {activeCountryId} = get();
	const create = createCart(set, get);

	const {cartId} = get();

	try {
		const cart = await Shopify.fetchCart(
			cartId,
			activeCountryId || DEFAULT_COUNTRY_ID,
		);

		if (cart) {
			cookie.set(SHOPIFY_CART_KEY, cart.id.toString(), {expires: 30});

			set({
				cart,
				cartId: cart.id,
				isHydratingCart: false,
			});
		} else {
			create();
		}
	} catch (error) {
		console.warn(error);
	}
};

export const createCart = (set, get) => async () => {
	const {activeCountryId} = get();

	try {
		const cart = await Shopify.createCart(
			activeCountryId || DEFAULT_COUNTRY_ID,
		);

		set({
			cart,
			cartId: cart.id,
			isHydratingCart: false,
		});

		cookie.set(SHOPIFY_CART_KEY, cart.id.toString(), {expires: 30});
	} catch (error) {
		console.warn(error);
	}
};

export const hydrateCart = (set, get) => async () => {
	const fetch = fetchCart(set, get);
	const create = createCart(set, get);

	const cartId = cookie.get(SHOPIFY_CART_KEY);

	set({isHydratingCart: true});

	if (cartId) {
		set({cartId});
		return fetch();
	} else {
		return create();
	}
};

export const addItemsToCart =
	(set, get) =>
	async (items = []) => {
		const {cartId} = get();

		set({isUpdatingCart: true});

		try {
			const cart = await Shopify.addCartLineItems(cartId, items);

			set({
				cart,
				isCartOpen: true,
			});
		} catch (error) {
			console.warn(error);
		}

		set({isUpdatingCart: false});
	};

export const updateItemsInCart =
	(set, get) =>
	async (items = []) => {
		const {cartId} = get();

		set({
			isUpdatingCart: true,
		});

		try {
			const cart = await Shopify.updateCartLineItems(cartId, items);

			set({cart});
		} catch (error) {
			console.warn(error);
		}

		set({isUpdatingCart: false});
	};

export const updateCartNote = (set, get) => async note => {
	const {cartId} = get();

	set({
		isUpdatingCart: true,
	});

	try {
		const cart = await Shopify.updateCartNote(cartId, note);

		set({cart});
	} catch (error) {
		console.warn(error);
	}

	set({isUpdatingCart: false});
};

export const hydrateAvailableCountries = (set, get) => async () => {
	set({isHydratingAvailableCountries: true});

	try {
		const availableCountries = await Shopify.fetchAvailableCountries();

		if (availableCountries) {
			set({availableCountries});
		}
	} catch (error) {
		console.warn(error);
	}

	set({isHydratingAvailableCountries: false});
};

export const hydrateActiveCountryId = (set, get) => async () => {
	try {
		const activeCountryId = cookie.get(COUNTRY_KEY);

		if (activeCountryId) {
			set({activeCountryId});
		}
	} catch (error) {
		console.warn(error);
	}
};

export const updateCartCountry = (set, get) => async activeCountryId => {
	const {cartId} = get();

	set({
		isUpdatingCart: true,
	});

	try {
		const cart = await Shopify.updateCartCountry(cartId, activeCountryId);

		set({cart, activeCountryId});

		cookie.set(COUNTRY_KEY, activeCountryId, {expires: 30});
	} catch (error) {
		console.warn(error);
	}

	set({isUpdatingCart: false});
};

const navigateToCheckout = (set, get) => async () => {
	const {cart} = get();

	if (!cart || !cart.checkoutUrl) return;

	set({isNavigatingToCheckout: true});

	global.location = `${cart.checkoutUrl}`;
};

//
// === useStore interface ===
//

export default create((...args) => ({
	// State
	...getInitialState(...args),

	// Actions
	setMobileMenuOpen: setMobileMenuOpen(...args),
	setCartOpen: setCartOpen(...args),
	completePasswordCheck: completePasswordCheck(...args),
	hydratePassword: hydratePassword(...args),
	completeCookieCheck: completeCookieCheck(...args),
	hydrateCookies: hydrateCookies(...args),
	hydrateCart: hydrateCart(...args),
	fetchCart: fetchCart(...args),
	createCart: createCart(...args),
	addItemsToCart: addItemsToCart(...args),
	updateItemsInCart: updateItemsInCart(...args),
	updateCartNote: updateCartNote(...args),
	hydrateActiveCountryId: hydrateActiveCountryId(...args),
	hydrateAvailableCountries: hydrateAvailableCountries(...args),
	updateCartCountry: updateCartCountry(...args),
	navigateToCheckout: navigateToCheckout(...args),
}));
