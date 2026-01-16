import {useState} from 'react';
import useShopifyProduct from '@/plugins/shopify/hooks/useShopifyProduct';
import useCart from '../hooks/useCart';
import getVariantByOptions from '../utils/getVariantByOptions';

const DEFAULT_OPTIONS = {
	lowStockThreshold: 5,
};

export default (product, OPTIONS = {}) => {
	const options = {
		...DEFAULT_OPTIONS,
		...OPTIONS,
	};

	const [quantity, setQuantity] = useState(1);
	const [isAddingToCart, setAddingToCart] = useState(false);
	const {isUpdatingCart, addItemsToCart} = useCart();

	const initialActiveVariant = product.variants[0];

	const [option1, setOption1] = useState(
		initialActiveVariant.option1 || null,
	);
	const [option2, setOption2] = useState(
		initialActiveVariant.option2 || null,
	);
	const [option3, setOption3] = useState(
		initialActiveVariant.option3 || null,
	);

	const activeOptions = [option1, option2, option3];
	const setOptions = [setOption1, setOption2, setOption3];
	const activeVariant = getVariantByOptions(activeOptions, product.variants);

	const {
		shopifyProduct,
		shopifyVariant,
		loadingInventory,
		error: shopifyInventoryError,
	} = useShopifyProduct(product._id, activeVariant._id);

	let isSoldOut = false;
	let isProductSoldOut = false;
	let isLowStock = false;
	let quantityAvailable = null;

	if (shopifyVariant) {
		isSoldOut = !shopifyVariant.available;

		if (shopifyVariant.quantityAvailable) {
			isLowStock =
				shopifyVariant.quantityAvailable < options.lowStockThreshold;
			quantityAvailable = shopifyVariant.quantityAvailable;
		}
	}

	if (shopifyProduct) {
		isProductSoldOut = !shopifyProduct.availableForSale;
	}

	const onAddItems = async (attributes = []) => {
		const lineItem = {
			merchandiseId: shopifyVariant.id,
			quantity,
			attributes,
		};

		setAddingToCart(true);

		await addItemsToCart(lineItem);

		setAddingToCart(false);
	};

	const onDecrementQuantity = () => {
		if (quantity <= 1) return;

		setQuantity(quantity - 1);
	};

	const onIncrementQuantity = () => {
		setQuantity(quantity + 1);
	};

	return {
		quantity,
		setQuantity,
		activeVariant,
		activeOptions,
		setOptions,
		isAddingToCart,
		isUpdatingCart,
		isSoldOut,
		isLowStock,
		isProductSoldOut,
		quantityAvailable,
		loadingInventory,
		shopifyInventoryError,
		onAddItems,
		onIncrementQuantity,
		onDecrementQuantity,
	};
};
