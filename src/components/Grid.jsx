import React from 'react';
import cx from 'classnames';

// Four columns on phones, twelve from md. Gutters match the page margins (16px, then 24px), which
// belong to the page container so nested grids line up with the outer one.
export default function Grid({as: Component = 'div', className, ...props}) {
	return (
		<Component
			className={cx(
				'grid grid-cols-4 gap-x-4 md:grid-cols-12 md:gap-x-6',
				className,
			)}
			{...props}
		/>
	);
}
