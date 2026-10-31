import React from 'react';
import NextLink from 'next/link';
import cx from 'classnames';
import {SmileyMelting} from '@phosphor-icons/react/dist/ssr';
import Grid from './Grid';
import {riseClassName, riseStyle} from '../config/rise';

// The item for the current page reads in ink; the rest are muted. Items without a destination are plain text.
const NavItem = ({title, url, pageId, slug, homepageId, currentPageId}) => {
	const current = Boolean(pageId) && pageId === currentPageId;
	const className = current ? undefined : 'text-muted';

	if (pageId) {
		const href = pageId === homepageId ? '/' : `/${slug}`;
		return (
			<NextLink
				href={href}
				className={className}
				aria-current={current ? 'page' : undefined}>
				{title}
			</NextLink>
		);
	}

	if (url) {
		return (
			<a href={url} className={className}>
				{title}
			</a>
		);
	}

	return <span className={className}>{title}</span>;
};

export default function Header({
	siteTitle,
	navItems = [],
	homepageId,
	currentPageId,
}) {
	return (
		<Grid as="header" className={riseClassName} style={riseStyle(0)}>
			<NextLink
				href="/"
				className="col-span-2 flex gap-2 font-bold md:col-span-4">
				<SmileyMelting aria-hidden="true" className="size-4 shrink-0" />
				{siteTitle}
			</NextLink>
			<nav
				className={cx(
					'col-span-2 flex justify-end gap-3 md:col-span-8 md:gap-6 md:font-bold',
				)}>
				{navItems?.map(item => (
					<NavItem
						key={item._key}
						{...item}
						homepageId={homepageId}
						currentPageId={currentPageId}
					/>
				))}
			</nav>
		</Grid>
	);
}
