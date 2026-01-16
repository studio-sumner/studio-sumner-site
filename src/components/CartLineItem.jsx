import React from 'react';
import cx from 'classnames';
import Link from './Link';
import moneyToPriceNoTrailingZeros from '../utils/moneyToPriceNoTrailingZeros';
import useCart from '../hooks/useCart';
import Image from './Image';
import {find} from 'lodash';

export default function CartLineItem({
	id,
	title,
	quantity,
	merchandise,
	cost,
	attributes = [],
}) {
	const {activeCurrencySymbol, isUpdatingCart, updateItemsInCart, closeCart} =
		useCart();

	const onRemove = () => {
		updateItemsInCart([{id, quantity: 0}]);
	};

	const onDecrementQuantity = () => {
		updateItemsInCart([{id, quantity: quantity - 1}]);
	};

	const onIncrementQuantity = () => {
		updateItemsInCart([{id, quantity: quantity + 1}]);
	};

	const removeButton = (
		<button
			aria-label={`Remove ${title}`}
			className={cx('block link-underline-hover', {
				'cursor-loading': isUpdatingCart,
			})}
			disabled={isUpdatingCart}
			onClick={onRemove}>
			Remove
		</button>
	);

	const imageColumn = (
		<div className="col-span-4">
			<Link
				url={`/products/${merchandise.product.handle}`}
				className="block w-full"
				onClick={closeCart}>
				{merchandise.image && (
					<div className="rounded-5 overflow-hidden">
						<Image
							className="h-full aspect-square"
							alt={merchandise.title}
							src={{
								type: 'shopifyImage',
								url: merchandise.image.src,
								maxWidth: 280,
								maxHeight: 280,
							}}
							lazy={false}
						/>
					</div>
				)}
			</Link>
		</div>
	);

	const header = (
		<div className="flex justify-between items-baseline gap-2 mb-2">
			<p>
				<Link
					url={`/products/${merchandise.product.handle}`}
					className="link-opacity-hover"
					onClick={closeCart}>
					{merchandise.product.title.split(' - ').map((line, key) => (
						<span key={key} className="block">
							{line}
						</span>
					))}
				</Link>
			</p>
			{removeButton}
		</div>
	);

	const quantityRow = (
		<div className="flex">
			<div className="h-3 flex justify-between items-center rounded-20 bg-gray-border">
				<button
					className="block button h-3 w-3 pt-[3px]"
					disabled={isUpdatingCart}
					onClick={onDecrementQuantity}
					aria-label="Decrement Quantity">
					-
				</button>
				<p className="w-2 text-center pt-[4px]">{quantity}</p>
				<button
					className="block button h-3 w-3 pt-[3px]"
					disabled={isUpdatingCart}
					onClick={onIncrementQuantity}
					aria-label="Increment Quantity">
					+
				</button>
			</div>
		</div>
	);

	const contentColumn = (
		<div className="col-span-8 flex flex-col gap-1 justify-between">
			{header}

			<div className="flex gap-1 justify-between">
				{quantityRow}
				{moneyToPriceNoTrailingZeros(
					cost.totalAmount,
					activeCurrencySymbol,
				)}
			</div>
		</div>
	);

	return (
		<div className="grid grid-cols-12 gap-x-gutter-mobile md:gap-x-gutter-desktop">
			{imageColumn}
			{contentColumn}
		</div>
	);
}
