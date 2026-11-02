import React from 'react';
import NextLink from 'next/link';
import {SmileyMelting} from '@phosphor-icons/react/dist/ssr';
import Grid from './Grid';
import ThemeToggle from './ThemeToggle';
import {riseClassName, riseStyle} from '../config/rise';

// Both titles share one grid cell, so the link keeps the width of the longer one.
const titleClassName =
	'[grid-area:1/1] transition-[opacity,translate] motion-reduce:transition-none';

// Mark and title at left; the Light/Dark toggle and the menu button at right, at every width.
// On hover the title rises out and the hover title rises in, as Jacquemus swaps colour names.
export default function Header({siteTitle, hoverTitle}) {
	return (
		<Grid as="header" className={riseClassName} style={riseStyle(0)}>
			<NextLink
				href="/"
				className="group col-span-2 flex gap-2 font-bold md:col-span-4">
				<SmileyMelting aria-hidden="true" className="size-4 shrink-0" />
				<span className="grid">
					<span
						className={
							hoverTitle
								? `${titleClassName} group-hover:-translate-y-4 group-hover:opacity-0 group-focus-visible:-translate-y-4 group-focus-visible:opacity-0`
								: '[grid-area:1/1]'
						}>
						{siteTitle}
					</span>
					{hoverTitle && (
						<span
							aria-hidden="true"
							className={`${titleClassName} translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100`}>
							{hoverTitle}
						</span>
					)}
				</span>
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
