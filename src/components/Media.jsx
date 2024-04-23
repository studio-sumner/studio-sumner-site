import React from 'react';
import Image from './Image';
import VideoPlayer from './VideoPlayer';
import imageAspectRatioStyles from '../utils/imageAspectRatioStyles';

export const MediaImage = ({image, fullWidth}) => {
	let sources = [
		{
			url: image.url,
			w: 1200,
			media: '(min-width: 800px)',
		},
		{
			url: image.url,
			w: 1000,
			media: '(min-width: 600px)',
		},
	];

	if (fullWidth) {
		sources = [
			{
				url: image.url,
				w: 2000,
				media: '(min-width: 1200px)',
			},
			{
				url: image.url,
				w: 1400,
				media: '(min-width: 1000px)',
			},
			...sources,
		];
	}

	return (
		<Image
			className="w-full"
			style={imageAspectRatioStyles(image.dimensions.aspectRatio)}
			sources={sources}
			src={{
				url: image.url,
				w: 800,
			}}
			lqip={image.lqip}
			alt={image.alt}
		/>
	);
};

export const MediaVideo = ({video, showControls}) => {
	return (
		<VideoPlayer
			video={video.video}
			showPlay
			showTimeline={showControls}
			showVolume={showControls}
			autoPlay={!showControls}
			loop={!showControls}
			muted={!showControls}
		/>
	);
};

export default function Media({_type, ...props}) {
	switch (_type) {
		case 'mediaImage': {
			return <MediaImage {...props} />;
		}
		case 'mediaVideo': {
			return <MediaVideo {...props} />;
		}
		default: {
			return null;
		}
	}
}
