import React from 'react';
import {m as motion, AnimatePresence} from 'framer-motion';
import ease from '../config/ease';
import useCart from '../hooks/useCart';

export function CartDrawer() {
	const {setCartOpen} = useCart();

	const header = (
		<div className="px-container-desktop md:px-container-desktop h-6 flex justify-between items-center">
			<h2>Cart</h2>

			<button
				className="block link-underline-hover"
				onClick={() => setCartOpen(false)}>
				Close
			</button>
		</div>
	);

	return (
		<div className="h-full bg-white flex flex-col justify-between">
			{header}
		</div>
	);
}

export default function Cart() {
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
			className="fixed z-10 top-0 right-0 bottom-0 w-full max-w-40"
			initial={{x: '100%'}}
			animate={{x: 0}}
			exit={{x: '100%'}}
			transition={{
				ease: ease.appear,
				duration: 500 / 1000,
			}}>
			<CartDrawer />
		</motion.div>
	);

	return (
		<AnimatePresence>
			{animatedBackground}
			{animatedCartDrawer}
		</AnimatePresence>
	);
}
