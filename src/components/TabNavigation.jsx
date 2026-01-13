import React, {useEffect, useRef, useState} from 'react';
import cx from 'classnames';
import {m as motion} from 'framer-motion';
import ease from '../config/ease';

export default function TabNavigation({
	tabs = [],
	activeIndex = 0,
	onChangeIndex = () => {},
	invert,
	ariaLabel = 'Tab navigation',
}) {
	const [activeTabPosition, setActiveTabPosition] = useState([0, 0]);
	const tabRefsByIndex = tabs.map(() => useRef(null));
	const buttonRefsByIndex = tabs.map(() => useRef(null));

	let indicator;

	const handleKeyDown = (event, currentIndex) => {
		let newIndex = currentIndex;

		switch (event.key) {
			case 'ArrowLeft':
				event.preventDefault();
				newIndex =
					currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
				break;
			case 'ArrowRight':
				event.preventDefault();
				newIndex =
					currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
				break;
			case 'Home':
				event.preventDefault();
				newIndex = 0;
				break;
			case 'End':
				event.preventDefault();
				newIndex = tabs.length - 1;
				break;
			default:
				return;
		}

		onChangeIndex(newIndex);
		buttonRefsByIndex[newIndex].current?.focus();
	};

	// Update position on change
	// Reset resize listener
	useEffect(() => {
		const onUpdatePosition = () => {
			const activeTabRef = tabRefsByIndex[activeIndex];

			if (!activeTabRef.current) return;

			const tabPosition = activeTabRef.current.getBoundingClientRect();

			setActiveTabPosition([
				activeTabRef.current.offsetLeft,
				tabPosition.width,
			]);
		};

		window.addEventListener('resize', onUpdatePosition);
		onUpdatePosition();

		return () => {
			window.removeEventListener('resize', onUpdatePosition);
		};
	}, [activeIndex]);

	if (activeTabPosition) {
		indicator = (
			<motion.div
				className={cx(
					'h-4 w-4 absolute left-0 top-0 rounded-50 overflow-hidden z-0',
					{
						'bg-white': invert,
						'bg-black': !invert,
					},
				)}
				animate={{
					left: activeTabPosition[0],
					width: activeTabPosition[1],
				}}
				transition={{
					ease: ease.appear,
					duration: 400 / 1000,
				}}
			/>
		);
	}

	const tabColumns = tabs.map((tab, index) => (
		<div key={index} ref={tabRefsByIndex[index]} className="table-cell">
			<button
				ref={buttonRefsByIndex[index]}
				role="tab"
				aria-selected={index === activeIndex}
				aria-controls={`tabpanel-${index}`}
				tabIndex={index === activeIndex ? 0 : -1}
				id={`tab-${index}`}
				className={cx('block button button-size-circle', {
					'text-black': index !== activeIndex || invert,
					'text-white': index === activeIndex && !invert,
				})}
				onClick={() => onChangeIndex(index)}
				onKeyDown={e => handleKeyDown(e, index)}>
				<span
					className={cx(
						'transition-colors duration-400 ease-appear whitespace-nowrap',
						{
							'text-black': index !== activeIndex || invert,
							'text-white': index === activeIndex && !invert,
							'opacity-50': index !== activeIndex,
						},
					)}>
					{tab}
				</span>
			</button>
		</div>
	));

	return (
		<div className="overflow-x-auto scroll-touch max-w-full rounded-50 p-[2px] relative bg-white/30 backdrop-blur-3xl">
			<div className="relative">
				{indicator}
				<div
					role="tablist"
					aria-label={ariaLabel}
					className="table table-fixed relative z-1">
					{tabColumns}
				</div>
			</div>
		</div>
	);
}
