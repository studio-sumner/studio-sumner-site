import React, {useEffect, useState} from 'react';
import Grid from './Grid';

const storageKey = 'studio-sumner:grid-overlay';

function readStored() {
	try {
		return localStorage.getItem(storageKey) === 'on';
	} catch {
		return false;
	}
}

function isTyping(target) {
	return (
		target instanceof HTMLElement &&
		(target.isContentEditable ||
			/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))
	);
}

// Debug overlay for alignment: press G to show the page's columns over the content. It uses the same
// margins and Grid as the page, so it switches from 4 to 12 columns at md just like the layout does.
export default function GridOverlay() {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		setVisible(readStored());

		const onKeyDown = event => {
			if (
				event.key.toLowerCase() !== 'g' ||
				event.metaKey ||
				event.ctrlKey ||
				event.altKey ||
				event.repeat
			)
				return;
			if (isTyping(event.target)) return;
			setVisible(current => {
				try {
					localStorage.setItem(storageKey, current ? 'off' : 'on');
				} catch {
					// Storage can be unavailable; the overlay still toggles for this page.
				}
				return !current;
			});
		};
		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
	}, []);

	if (!visible) return null;
	return (
		<div
			aria-hidden
			className="pointer-events-none fixed inset-0 z-50 px-4 md:px-6">
			<Grid className="h-full">
				{Array.from({length: 12}, (_, i) => (
					<div
						key={i}
						className={`h-full bg-accent/10 ${i >= 4 ? 'hidden md:block' : ''}`}
					/>
				))}
			</Grid>
		</div>
	);
}
