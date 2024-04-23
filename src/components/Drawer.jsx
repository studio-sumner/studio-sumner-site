import React, {useState, useRef} from 'react';
import isBoolean from 'lodash/isBoolean';
import {m as motion} from 'framer-motion';
import ease from '../config/ease';

const TRANSITION = {
	ease: ease.inOutQuart,
	duration: 400 / 1000,
};

export default function Drawer({
	renderTrigger = ({onClick}) => <button onClick={onClick} />,
	openByDefault = false,
	open,
	children,
	transitionDuration = 400,
}) {
	const heightEl = useRef(null);
	const [isOpen, setIsOpen] = useState(openByDefault);
	const statefulOpen = isBoolean(open) ? open : isOpen;

	const onClickTrigger = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div>
			{renderTrigger({
				onClick: onClickTrigger,
				isOpen: statefulOpen,
			})}
			<motion.div
				initial={false}
				animate={{height: statefulOpen ? 'auto' : 0}}
				transition={{
					...TRANSITION,
					duration: transitionDuration / 1000,
				}}
				className="overflow-hidden">
				<div ref={heightEl}>{children}</div>
			</motion.div>
		</div>
	);
}
