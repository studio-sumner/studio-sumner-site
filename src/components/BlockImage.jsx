import React from 'react';
import Image from './Image';
import imageAspectRatioStyles from '../utils/imageAspectRatioStyles';

export default function BlockImage({value}) {
	const {url, alt, caption, dimensions, lqip} = value.asset;

	return (
		<figure className="my-1 flex flex-col gap-1">
			<Image
				style={imageAspectRatioStyles(dimensions.aspectRatio)}
				alt={alt}
				sources={[
					{
						url: url,
						w: 1000,
						media: '(min-width: 600px)',
					},
				]}
				src={{
					url: url,
					w: 800,
				}}
				lqip={lqip}
			/>
			{caption && <figcaption>{caption}</figcaption>}
		</figure>
	);
}
