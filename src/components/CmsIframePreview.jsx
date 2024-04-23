import React from 'react';

export default function CmsIframePreview({document, options}) {
	const {displayed} = document;
	const url = `${options.previewURL}?draft_id=${displayed._id}&token=${options.token}`;

	return (
		<div
			style={{
				border: 0,
				height: '100%',
				left: 0,
				position: 'absolute',
				top: 0,
				width: '100%',
			}}>
			<iframe
				src={url}
				frameBorder={'0'}
				style={{
					border: 0,
					height: '100%',
					left: 0,
					position: 'absolute',
					top: 0,
					width: '100%',
				}}
			/>
		</div>
	);
}
