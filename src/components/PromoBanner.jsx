import React from 'react';
import cx from 'classnames';
import BlockContent from '@sanity/block-content-to-react';
import richText from '../serializers/richText';
import getColorStyle from '../utils/getColorStyle';

export default function PromoBanner({
	description = [],
	backgroundColor,
	invertTextColor,
}) {
	return (
		<div
			style={getColorStyle(backgroundColor)}
			className={cx(
				'px-container-mobile md:px-container-desktop pt-[4px] pb-[2px]',
				{
					'text-white bg-black': invertTextColor,
					'bg-green': !invertTextColor,
				},
			)}>
			<div className="rich-text text-center text-12/12 uppercase font-500">
				<BlockContent blocks={description} serializers={richText} />
			</div>
		</div>
	);
}
