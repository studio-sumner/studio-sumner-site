import React from 'react';
import cx from 'classnames';
import Image from './Image';
import imageAspectRatioStyles from '../utils/imageAspectRatioStyles';
import Video from './Video';
import {get} from 'lodash';

export const MediaImage = ({
	image,
	size = 'small',
	disableAspectRatio,
	className,
	...props
}) => {
	let sources = [];

	switch (size) {
		case 'medium': {
			sources = [
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
			break;
		}
		case 'large': {
			sources = [
				{
					url: image.url,
					w: 2000,
					media: '(min-width: 1200px)',
				},
				{
					url: image.url,
					w: 1600,
					media: '(min-width: 1000px)',
				},
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
			break;
		}
	}

	const styles = !disableAspectRatio
		? imageAspectRatioStyles(image.dimensions.aspectRatio)
		: {};

	return (
		<Image
			className={cx('w-full', className)}
			style={styles}
			sources={sources}
			src={{
				url: image.url,
				w: 800,
			}}
			lqip={image.lqip}
			alt={image.alt}
			{...props}
		/>
	);
};

export const MediaVideo = ({
	video,
	showControls,
	disableAspectRatio,
	className,
	...props
}) => {
	let videoAspectRatioString = get(video, 'video.asset.data.aspect_ratio');
	let aspectRatio = 1;

	if (videoAspectRatioString) {
		const [widthString, heightString] = videoAspectRatioString.split(':');
		aspectRatio = Number(heightString) / Number(widthString);
	}

	const styles = !disableAspectRatio
		? {
				height: 0,
				paddingBottom: `${aspectRatio * 100}%`,
			}
		: {};

	return (
		<div className={cx('relative', className)} style={styles}>
			<Video
				video={video.video.asset}
				className="image absolute inset-0"
				controls={showControls}
				loop={!showControls}
				playsInline
				autoPlay
				muted
				lazyOnScroll
			/>
		</div>
	);
};

export default ({_type, ...props}) => {
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
};
