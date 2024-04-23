import React from 'react';
import Link from '../components/Link';
import getDistanceFromTop from '../utils/getDistanceFromTop';
import scrollTo from '../utils/scrollTo';
import config from '../../config';

const SCROLL_BUFFER = config.scrollBuffer;

export default function MarkLink(props) {
	const onClick = event => {
		const hash = props.mark.href ? props.mark.href.split('#')[1] : null;

		// Prevent default scroll handler
		if (hash) {
			const activeEl = document.getElementById(hash);

			if (activeEl) {
				event.preventDefault();

				scrollTo(getDistanceFromTop(activeEl) - SCROLL_BUFFER);
			}
		}
	};

	if (props.mark.href[0] === '/') {
		return (
			<Link
				onClick={onClick}
				title={props.mark.title}
				target={props.mark.openInNewWindow ? '_blank' : null}
				url={props.mark.href}>
				{props.children}
			</Link>
		);
	}

	return (
		<a
			onClick={onClick}
			title={props.mark.title}
			target={props.mark.openInNewWindow ? '_blank' : null}
			href={props.mark.href}>
			{props.children}
		</a>
	);
}
