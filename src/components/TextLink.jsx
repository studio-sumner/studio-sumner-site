import React from 'react';
import cx from 'classnames';

// Modeled on jacquemus.com: no underline at rest; on hover a line grows in from the left and on
// leave it retracts to the right. It is 1/12 of the font size: 1px at 12px, 2px at 24px.
// A background line, unlike ::after, follows wrapped text.
export default function TextLink({className, openInNewWindow, ...props}) {
	return (
		<a
			className={cx(
				'text-accent bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat bg-[length:0%_calc(1em/12)] bg-[position:100%_100%]',
				'transition-[background-size] motion-reduce:transition-none',
				'hover:bg-[length:100%_calc(1em/12)] hover:bg-[position:0_100%] focus-visible:bg-[length:100%_calc(1em/12)] focus-visible:bg-[position:0_100%] focus-visible:outline-none',
				className,
			)}
			target={openInNewWindow ? '_blank' : undefined}
			rel={openInNewWindow ? 'noreferrer' : undefined}
			{...props}
		/>
	);
}
