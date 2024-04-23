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
			className={cx({
				'text-white': invertTextColor,
			})}>
			<div className="rich-text text-center">
				<BlockContent blocks={description} serializers={richText} />
			</div>
		</div>
	);
}
