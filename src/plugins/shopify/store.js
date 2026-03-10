import Shopify from './api/shopifyStorefront';
import cookie from 'js-cookie';

//
// === Initial State ===
//
export const getInitialState = (set, get, config) => ({
	isHydratingCart: false,
	isUpdatingCart: false,
	isNavigatingToCheckout: false,
	cartId: null,
	cart: null,
	availableCountries: [],
	isHydratingAvailableCountries: false,
	activeCountryId: config.defaultCountryId, // default to USA currency
});

//
// === Store Actions
//

export const fetchCart = (set, get, config) => async () => {
	const {activeCountryId} = get();
	const create = createCart(set, get, config);

	const {cartId} = get();

	try {
		const cart = await Shopify.fetchCart(
			cartId,
			activeCountryId || config.defaultCountryId,
		);

		if (cart) {
			cookie.set(config.cookieCartKey, cart.id.toString(), {expires: 30});

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

export const createCart = (set, get, config) => async () => {
	const {activeCountryId} = get();

	try {
		const cart = await Shopify.createCart(
			activeCountryId || config.defaultCountryId,
		);

		set({
			cart,
			cartId: cart.id,
			isHydratingCart: false,
		});

		cookie.set(config.cookieCartKey, cart.id.toString(), {expires: 30});
	} catch (error) {
		console.warn(error);
	}
};

export const hydrateCart = (set, get, config) => async () => {
	const fetch = fetchCart(set, get, config);
	const create = createCart(set, get, config);

	const cartId = cookie.get(config.cookieCartKey);

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

export const updateCartNote = (set, get, config) => async note => {
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

export const hydrateAvailableCountries = (set, get, config) => async () => {
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

export const hydrateActiveCountryId = (set, get, config) => async () => {
	try {
		const activeCountryId = cookie.get(config.cookieCountryKey);

		if (activeCountryId) {
			set({activeCountryId});
		}
	} catch (error) {
		console.warn(error);
	}
};

export const updateCartCountry =
	(set, get, config) => async activeCountryId => {
		const {cartId} = get();

		set({
			isUpdatingCart: true,
		});

		try {
			const cart = await Shopify.updateCartCountry(
				cartId,
				activeCountryId,
			);

			set({cart, activeCountryId});

			cookie.set(config.cookieCountryKey, activeCountryId, {expires: 30});
		} catch (error) {
			console.warn(error);
		}

		set({isUpdatingCart: false});
	};

const navigateToCheckout = (set, get, config) => async () => {
	const {cart} = get();

	if (!cart || !cart.checkoutUrl) return;

	set({isNavigatingToCheckout: true});

	global.location = `${cart.checkoutUrl}`;
};

export const getActions = (set, get, config) => ({
	hydrateCart: hydrateCart(set, get, config),
	fetchCart: fetchCart(set, get, config),
	createCart: createCart(set, get, config),
	addItemsToCart: addItemsToCart(set, get, config),
	updateItemsInCart: updateItemsInCart(set, get, config),
	updateCartNote: updateCartNote(set, get, config),
	hydrateActiveCountryId: hydrateActiveCountryId(set, get, config),
	hydrateAvailableCountries: hydrateAvailableCountries(set, get, config),
	updateCartCountry: updateCartCountry(set, get, config),
	navigateToCheckout: navigateToCheckout(set, get, config),
});
