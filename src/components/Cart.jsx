import React from 'react';
import Link from './Link';
import CartLineItem from './CartLineItem';
import {m as motion, AnimatePresence} from 'framer-motion';
import ease from '../config/ease';
import useCart from '../hooks/useCart';
import moneyToPriceNoTrailingZeros from '../utils/moneyToPriceNoTrailingZeros';

export function CartDrawer({emptyStateTitle, emptyStateCta}) {
	const {
		setCartOpen,
		subtotalAmount,
		navigateToCheckout,
		lineItems = [],
		isEmpty,
	} = useCart();

	const header = (
		<div className="px-container-desktop md:px-container-desktop border-b border-solid border-gray-border">
			<div className="h-6 flex justify-between items-center">
				<h2>Cart</h2>

				<button
					className="block link-underline-hover"
					onClick={() => setCartOpen(false)}>
					Close
				</button>
			</div>
		</div>
	);

	const emptyState = isEmpty && (
		<div className="grow p-1 flex flex-col gap-2 items-center justify-center">
			<p className="text-center text-24/32">{emptyStateTitle}</p>
			{emptyStateCta && (
				<Link
					{...emptyStateCta}
					onClick={() => setCartOpen(false)}
					className="block button button-primary"
				/>
			)}
		</div>
	);

	const body = !isEmpty && (
		<div className="grow p-container-desktop md:p-container-desktop overflow-y-auto scroll-touch">
			<div className="flex flex-col gap-2">
				{lineItems.map(lineItem => (
					<CartLineItem key={lineItem.id} {...lineItem} />
				))}
			</div>
		</div>
	);

	const footer = (
		<div className="border-t border-solid border-gray-border">
			<div className="p-container-desktop md:p-container-desktop flex flex-col gap-2">
				<div className="flex justify-between">
					<p>Subtotal</p>
					<p>{moneyToPriceNoTrailingZeros(subtotalAmount)}</p>
				</div>
				<button
					className="block w-full button button-primary"
					onClick={navigateToCheckout}>
					Check Out
				</button>
			</div>
		</div>
	);

	return (
		<div className="h-full bg-white flex flex-col justify-between">
			{header}
			{emptyState}
			{body}
			{footer}
		</div>
	);
}

export default function Cart({emptyStateTitle, emptyStateCta}) {
	const {isCartOpen, setCartOpen} = useCart();

	const animatedBackground = isCartOpen && (
		<motion.div
			className="fixed z-9 inset-0 bg-black/20"
			initial={{opacity: 0}}
			animate={{opacity: 1}}
			exit={{opacity: 0}}
			transition={{
				ease: ease.appear,
				duration: 500 / 1000,
			}}
			onClick={() => setCartOpen(false)}
		/>
	);

	const animatedCartDrawer = isCartOpen && (
		<motion.div
			className="fixed z-10 top-0 right-0 bottom-0 w-full md:max-w-40"
			initial={{x: '100%'}}
			animate={{x: 0}}
			exit={{x: '100%'}}
			transition={{
				ease: ease.appear,
				duration: 500 / 1000,
			}}>
			<CartDrawer
				emptyStateTitle={emptyStateTitle}
				emptyStateCta={emptyStateCta}
			/>
		</motion.div>
	);

	return (
		<AnimatePresence>
			{animatedBackground}
			{animatedCartDrawer}
		</AnimatePresence>
	);
}
