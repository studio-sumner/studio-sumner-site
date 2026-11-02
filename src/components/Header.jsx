import React from 'react';
import NextLink from 'next/link';
import {SmileyMelting} from '@phosphor-icons/react/dist/ssr';
import Grid from './Grid';
import ThemeToggle from './ThemeToggle';
import {riseClassName, riseStyle} from '../config/rise';

// Mark and title at left; the Light/Dark toggle and the menu button at right, at every width.
export default function Header({siteTitle}) {
	return (
		<Grid as="header" className={riseClassName} style={riseStyle(0)}>
			<NextLink
				href="/"
				className="col-span-2 flex gap-2 font-bold md:col-span-4">
				<SmileyMelting aria-hidden="true" className="size-4 shrink-0" />
				{siteTitle}
			</NextLink>
			<div className="col-span-2 flex items-center justify-end gap-3 md:col-span-8">
				<ThemeToggle />
				{/* Placeholder for the menu button; it has no menu yet. */}
				<span
					aria-hidden="true"
					className="size-4 shrink-0 rounded-full bg-foreground"
				/>
			</div>
		</Grid>
	);
}
