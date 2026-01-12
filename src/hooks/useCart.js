import useStore from '../stores/useStore';
import reduce from 'lodash/reduce';
import filter from 'lodash/filter';
import find from 'lodash/find';

export default () => {
	const cart = useStore(s => s.cart);
	const isUpdatingCart = useStore(s => s.isUpdatingCart);
	const isCartOpen = useStore(s => s.isCartOpen);
	const isNavigatingToCheckout = useStore(s => s.isNavigatingToCheckout);
	const availableCountries = useStore(s => s.availableCountries);
	const isHydratingAvailableCountries = useStore(
		s => s.isHydratingAvailableCountries,
	);
	const activeCountryId = useStore(s => s.activeCountryId);

	let isEmpty = false;
	let lineItemCount = 0;
	let lineItems = [];
	let unfilteredLineItems = [];
	let subtotalAmount = {amount: '0'};
	let note = null;
	let activeCountry;
	let activeCurrencySymbol = '$';

	if (activeCountryId && availableCountries && availableCountries.length) {
		activeCountry = find(availableCountries, {isoCode: activeCountryId});
		activeCurrencySymbol = activeCountry.currency.symbol;
	}

	if (cart) {
		unfilteredLineItems = cart.lines;

		lineItems = filter(cart.lines, ({attributes = []}) => {
			const isHidden = !!find(attributes, {
				key: '_hidden',
				value: 'true',
			});
			return !isHidden;
		});

		lineItemCount = reduce(
			lineItems,
			(runningTotal, item) => {
				return item.quantity + runningTotal;
			},
			0,
		);

		note = cart.note;

		if (lineItemCount) {
			subtotalAmount = cart.estimatedCost.subtotalAmount;
		}

		isEmpty = lineItemCount <= 0;
	}

	const addItemsToCart = useStore(s => s.addItemsToCart);
	const updateItemsInCart = useStore(s => s.updateItemsInCart);
	const updateCartNote = useStore(s => s.updateCartNote);
	const setCartOpen = useStore(s => s.setCartOpen);
	const navigateToCheckout = useStore(s => s.navigateToCheckout);
	const updateCartCountry = useStore(s => s.updateCartCountry);

	return {
		cart,
		note,
		subtotalAmount,
		lineItems,
		unfilteredLineItems,
		lineItemCount,
		availableCountries,
		activeCountryId,
		activeCountry,
		activeCurrencySymbol,
		isCartOpen,
		isEmpty,
		isUpdatingCart,
		isHydratingAvailableCountries,
		isNavigatingToCheckout,
		addItemsToCart,
		updateItemsInCart,
		updateCartNote,
		setCartOpen,
		navigateToCheckout,
		updateCartCountry,
	};
};
