import useShopifyProduct from '@/plugins/shopify/hooks/useShopifyProduct';
import centsToPriceNoTrailingZeros from '../utils/centsToPriceNoTrailingZeros';
import centsToPrice from '../utils/centsToPrice';
import moneyToPriceNoTrailingZeros from '../utils/moneyToPriceNoTrailingZeros';
import moneyToPrice from '../utils/moneyToPrice';
import isNumber from 'lodash/isNumber';
import useCart from '../hooks/useCart';

const ShopifyPrice = ({
	// Required
	productId,
	variantId,
	cents,
	compareAtCents,
	// Config
	noTrailingZeros,
	compareAt,
}) => {
	const {activeCurrencySymbol} = useCart();

	const {shopifyProduct, shopifyVariant, error} = useShopifyProduct(
		productId,
		variantId,
	);

	// Render live price if we have it
	if (!error && shopifyProduct && shopifyVariant) {
		let activePrice = shopifyVariant.price;

		if (compareAt && shopifyVariant.compareAtPrice) {
			activePrice = shopifyVariant.compareAtPrice;
		}

		if (noTrailingZeros) {
			return moneyToPriceNoTrailingZeros(
				activePrice,
				activeCurrencySymbol,
			);
		} else {
			return moneyToPrice(activePrice, activeCurrencySymbol);
		}
	}

	// Back up to cents based pricing from CMS
	let activeCents = cents;

	if (compareAt && isNumber(compareAtCents)) {
		activeCents = compareAtCents;
	}
	if (noTrailingZeros) {
		return centsToPriceNoTrailingZeros(activeCents);
	} else {
		return centsToPrice(activeCents);
	}
};

export default ShopifyPrice;
