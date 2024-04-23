import React from 'react';

export default function IframeEmbed({code}) {
	return (
		<div className="max-w-grid px-container-mobile md:px-container-desktop">
			<div dangerouslySetInnerHTML={{__html: code}} />
		</div>
	);
}
