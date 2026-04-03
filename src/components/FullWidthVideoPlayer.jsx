import React, {useState} from 'react';
import cx from 'classnames';
import BackgroundMedia from './BackgroundMedia';
import Video from './Video';

export default function FullWidthVideoPlayer({
	containVideo,
	playCta,
	previewBackground,
	video,
}) {
	const [isPlayerVisible, setPlayerVisible] = useState(false);

	const previewBackgroundMedia = !isPlayerVisible && (
		<div className="absolute inset-0">
			<BackgroundMedia
				{...previewBackground}
				className="absolute inset-0"
			/>
			<div className="absolute inset-0 flex flex-col justify-center items-center">
				<button
					onClick={() => setPlayerVisible(true)}
					className="block text-white">
					{playCta}
				</button>
			</div>
		</div>
	);

	const videoPlayer = isPlayerVisible && (
		<Video
			video={video.video.asset}
			altText={video.altText}
			className="image absolute inset-0"
			playsInline
			autoPlay
			controls
			lazyOnScroll
		/>
	);

	return (
		<div
			className={cx({
				'px-container-mobile md:px-container-desktop': containVideo,
			})}>
			<div className="relative w-full aspect-video">
				{previewBackgroundMedia}
				{videoPlayer}
			</div>
		</div>
	);
}
