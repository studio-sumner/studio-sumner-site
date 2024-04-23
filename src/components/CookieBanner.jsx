import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import richText from '../serializers/richText';

export default function CookieBanner({description = []}) {
	return (
		<div>
			<div className="rich-text text-center">
				<BlockContent blocks={description} serializers={richText} />
			</div>
		</div>
	);
}
