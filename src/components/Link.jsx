import React, {Fragment} from 'react';
import cx from 'classnames';
import NextLink from 'next/link';
import getDistanceFromTop from '../utils/getDistanceFromTop';
import scrollTo from '../utils/scrollTo';
import {usePathname} from 'next/navigation';
import config from '../../config';

const SCROLL_BUFFER = config.scrollBuffer;

export const LinkChild = ({title, pageName}) => (
	<Fragment>{title || pageName}</Fragment>
);

export default function Link({
	_type,
	title,
	url,
	slug,
	openInNewWindow,
	pageName,
	editName,
	children,
	className,
	scroll = false,
	onClick = () => {},
	scrollBuffer = SCROLL_BUFFER,
	enableActive,
	featured,
	...props
}) {
	const pathname = usePathname();
	let href = url || '';
	let active = false;

	if (enableActive) {
		if (_type === 'pageLink') {
			href = `/${slug}`;
			if (pathname) {
				active = href === pathname;
			}
		} else {
			if (pathname) {
				active = href === pathname;
			}
		}
	}

	const onClickLink = event => {
		const hash = url ? url.split('#')[1] : null;

		// Prevent default scroll handler
		if (hash) {
			const activeEl = document.getElementById(hash);

			if (activeEl) {
				event.preventDefault();

				scrollTo(getDistanceFromTop(activeEl) - scrollBuffer);
			}
		}

		onClick(event);
	};

	if (_type === 'pageLink') {
		return (
			<NextLink
				{...props}
				onClick={onClickLink}
				className={cx(className, {active})}
				title={title || pageName}
				target={openInNewWindow ? '_blank' : undefined}
				rel={openInNewWindow ? 'noopener noreferrer' : undefined}
				scroll={scroll}
				href={`/${slug}`}>
				{children || title || pageName}
			</NextLink>
		);
	} else if (url && (url.indexOf('/') === 0 || url.indexOf('#') === 0)) {
		return (
			<NextLink
				{...props}
				onClick={onClickLink}
				className={cx(className, {active})}
				title={title}
				target={openInNewWindow ? '_blank' : undefined}
				rel={openInNewWindow ? 'noopener noreferrer' : undefined}
				scroll={scroll}
				href={url}>
				{children || title}
			</NextLink>
		);
	} else {
		return (
			<a
				{...props}
				onClick={onClickLink}
				className={cx(className, {active})}
				title={title}
				target={openInNewWindow ? '_blank' : undefined}
				rel={openInNewWindow ? 'noopener noreferrer' : undefined}
				href={url}>
				{children || title}
			</a>
		);
	}
}
