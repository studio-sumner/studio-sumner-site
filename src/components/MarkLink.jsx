import React from 'react';
import Link from '../components/Link';

export default function MarkLink({value, children}) {
	if (value.href[0] === '/') {
		return (
			<Link
				title={value.title}
				target={value.openInNewWindow ? '_blank' : null}
				url={value.href}>
				{children}
			</Link>
		);
	}

	return (
		<a
			title={value.title}
			target={value.openInNewWindow ? '_blank' : null}
			href={value.href}>
			{children}
		</a>
	);
}
