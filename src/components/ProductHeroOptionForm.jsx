import React from 'react';
import cx from 'classnames';

export default function ProductHeroOptionForm({
	title,
	value,
	options = [],
	setValue,
}) {
	return (
		<div>
			<p>{title}:</p>
			<div className="grid grid-cols-5 gap-1">
				{options?.map(option => (
					<button
						key={option._key}
						onClick={() => setValue(option.name)}
						className={cx('block w-full button button-variant', {
							active: option.name === value,
						})}>
						{option.name}
					</button>
				))}
			</div>
		</div>
	);
}
