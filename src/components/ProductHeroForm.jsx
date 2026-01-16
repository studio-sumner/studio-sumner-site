import React from 'react';
import cx from 'classnames';
import useProductForm from '../hooks/useProductForm';
import ProductHeroOptionForm from './ProductHeroOptionForm';

export default function ProductHeroForm({product}) {
	const {options} = product;

	const {
		activeOptions,
		setOptions,
		isSoldOut,
		isLowStock,
		quantityAvailable,
		isAddingToCart,
		isUpdatingCart,
		loadingInventory,
		shopifyInventoryError,
		onAddItems,
		onIncrementQuantity,
		onDecrementQuantity,
		quantity,
		setQuantity,
	} = useProductForm(product);

	const optionForms = options?.map((option, optionIndex) => (
		<ProductHeroOptionForm
			key={option._key}
			title={option.name}
			value={activeOptions[optionIndex]}
			options={option.values}
			setValue={setOptions[optionIndex]}
		/>
	));

	let atcTitle = 'Add to Cart';

	if (isSoldOut) {
		atcTitle = 'Sold Out';
	} else if (shopifyInventoryError) {
		atcTitle = 'Error loading inventory';
	} else if (isAddingToCart) {
		atcTitle = 'Adding…';
	}

	const addToCartButton = (
		<button
			disabled={
				loadingInventory ||
				isUpdatingCart ||
				shopifyInventoryError ||
				isSoldOut
			}
			aria-label={`Add ${product.title} to Cart`}
			className={cx('block w-full button button-primary', {
				loading: isAddingToCart,
			})}
			onClick={() => onAddItems()}>
			{atcTitle}
		</button>
	);

	const lowStockMessage = Boolean(isLowStock && quantityAvailable) && (
		<div className="absolute bottom-[4px] right-[4px] w-10 pointer-events-none">
			<div className="bg-white/40 pt-half px-1 pb-[3px] rounded-5 text-center">
				Only {quantityAvailable} left!
			</div>
		</div>
	);

	return (
		<div className="flex flex-col gap-2 relative">
			{optionForms}
			{addToCartButton}
			{lowStockMessage}
		</div>
	);
}
