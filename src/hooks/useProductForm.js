import {useState} from 'react';
import useShopifyProduct from '../hooks/useShopifyProduct';
import useCart from '../hooks/useCart';
import getVariantByOptions from '../utils/getVariantByOptions';

const DEFAULT_OPTIONS = {};

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

	if (shopifyVariant) {
		isSoldOut = !shopifyVariant.available;
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
		isProductSoldOut,
		loadingInventory,
		shopifyInventoryError,
		onAddItems,
		onIncrementQuantity,
		onDecrementQuantity,
	};
};
