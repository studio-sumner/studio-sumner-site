import React, {useEffect, useState} from 'react';
import cx from 'classnames';

const STORAGE_KEY = 'theme';
const DARK_QUERY = '(prefers-color-scheme: dark)';

// Runs in <head> before the page paints, so a saved choice never flashes the other theme.
// With no saved choice it resolves the system theme.
export const themeScript = `(function(){try{var s=localStorage.getItem('${STORAGE_KEY}');var t=s==='light'||s==='dark'?s:(matchMedia('${DARK_QUERY}').matches?'dark':'light');document.documentElement.dataset.theme=t}catch(e){}})();`;

const getStored = () => {
	try {
		return localStorage.getItem(STORAGE_KEY);
	} catch (e) {
		return null;
	}
};

const applyTheme = theme => {
	document.documentElement.dataset.theme = theme;
};

// Cross-fades snapshots of the page before and after (styled in main.css), so every colour
// changes in step. Switches instantly where View Transitions aren't supported or motion is reduced.
const applyThemeWithTransition = theme => {
	if (
		!document.startViewTransition ||
		matchMedia('(prefers-reduced-motion: reduce)').matches
	) {
		applyTheme(theme);
		return;
	}
	document.startViewTransition(() => applyTheme(theme));
};

// Selection is styled with `dark:` so it is right on first paint; aria-pressed follows once mounted.
const Option = ({label, value, theme, onSelect, className}) => (
	<button
		type="button"
		aria-pressed={theme ? theme === value : undefined}
		onClick={() => onSelect(value)}
		className={cx('relative cursor-pointer px-1.5 text-xs', className)}>
		{label}
	</button>
);

export default function ThemeToggle() {
	const [theme, setTheme] = useState(null);

	useEffect(() => {
		setTheme(document.documentElement.dataset.theme || 'light');

		// Follow the system theme until a visitor picks one.
		const media = matchMedia(DARK_QUERY);
		const onChange = event => {
			if (getStored()) return;
			const next = event.matches ? 'dark' : 'light';
			applyTheme(next);
			setTheme(next);
		};
		media.addEventListener('change', onChange);
		return () => media.removeEventListener('change', onChange);
	}, []);

	const select = value => {
		if (value !== document.documentElement.dataset.theme) {
			applyThemeWithTransition(value);
			setTheme(value);
		}
		try {
			localStorage.setItem(STORAGE_KEY, value);
		} catch (e) {
			// Storage blocked: the choice lasts until the page reloads.
		}
	};

	return (
		// Two equal columns, so the grey box moves exactly one column between them. Its own
		// view-transition name lets it slide while the rest of the page cross-fades.
		<div
			role="group"
			aria-label="Colour mode"
			className="relative grid grid-cols-2">
			<span
				aria-hidden="true"
				className="absolute inset-y-0 left-0 w-1/2 bg-line [view-transition-name:theme-chip] dark:translate-x-full"
			/>
			<Option
				label="Light"
				value="light"
				theme={theme}
				onSelect={select}
				className="dark:text-muted"
			/>
			<Option
				label="Dark"
				value="dark"
				theme={theme}
				onSelect={select}
				className="text-muted dark:text-foreground"
			/>
		</div>
	);
}
