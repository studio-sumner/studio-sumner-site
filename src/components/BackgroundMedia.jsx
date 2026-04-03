import React, {useRef} from 'react';
import Image from './Image';
import Video from './Video';

export default function BackgroundMedia({
	_type,
	video,
	altText, // For video specifically
	image,
	imageMobile,
	autoPlay = true,
	className = 'absolute inset-0',
}) {
	const videoRef = useRef(null);

	const captureVideoRef = ref => {
		videoRef.current = ref.current;
	};

	let content;

	switch (_type) {
		case 'backgroundImage': {
			content = (
				<Image
					className="absolute inset-0"
					sources={[
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
						{
							url: image.url,
							w: 1200,
							media: '(min-width: 800px)',
						},
						{
							url: imageMobile ? imageMobile.url : image.url,
							w: 1000,
							media: '(min-width: 600px)',
						},
					]}
					src={{
						url: imageMobile ? imageMobile.url : image.url,
						w: 800,
					}}
					lqip={imageMobile ? imageMobile.lqip : image.lqip}
					alt={image.alt}
				/>
			);
			break;
		}

		case 'video': {
			content = (
				<Video
					video={video.asset}
					altText={altText}
					className="image absolute inset-0"
					playsInline
					loop
					autoPlay={autoPlay}
					muted
					lazyOnScroll
					videoRef={captureVideoRef}
				/>
			);
			break;
		}
	}

	return <div className={className}>{content}</div>;
}
