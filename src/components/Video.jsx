import React, {useState, useEffect, useRef} from 'react';
import classNames from 'classnames';
import viewport from '../utils/viewport';
import HLS from 'hls.js';

const Video = ({
	video,
	altText, // Specifically for video
	poster,
	posterWidth = 1920,
	posterFitMode = 'preserve',
	className,
	videoClassName = 'block w-full',
	videoRef = () => {},
	lazy,
	loadVideo,
	lazyOnScroll,
	lazyScrollThreshold = 400,
	...props
}) => {
	const [isVisible, setVisible] = useState(false);
	const [notSupported, setNotSupported] = useState(false);
	const container = useRef(null);
	const videoEl = useRef(null);
	const loadImmediately = !lazyOnScroll && !lazy;

	const posterImage =
		poster ||
		`https://image.mux.com/${
			video.playbackId
		}/thumbnail.jpg?width=${posterWidth}&fit_mode=${posterFitMode}&time=${
			video.thumbTime || '0'
		}`;

	let src = '';

	if (loadImmediately || (lazyOnScroll && isVisible) || (lazy && loadVideo)) {
		src = `https://stream.mux.com/${video.playbackId}.m3u8`;
	}

	//
	// === Setup Lazy ===
	//

	useEffect(() => {
		if (lazyOnScroll) {
			const onScroll = () => {
				if (!container.current) return;

				const position = container.current.getBoundingClientRect();

				if (position.top <= global.innerHeight + lazyScrollThreshold) {
					setVisible(true);
					viewport.unlisten(onScroll);
				}
			};

			viewport.listen(onScroll);
			onScroll();

			return () => viewport.unlisten(onScroll);
		}
	}, [lazyOnScroll]);

	//
	// === Setup HLS + Plyr ===
	//

	useEffect(() => {
		let hls;

		// Only run if we're in browser
		if (!videoEl.current) return;

		const canStream = videoEl.current.canPlayType(
			'application/vnd.apple.mpegurl',
		);

		// If we can play HLS, leave it alone
		if (!canStream) {
			if (HLS.isSupported()) {
				hls = new HLS();
				hls.loadSource(src);
				hls.attachMedia(videoEl.current);
			} else {
				setNotSupported(true);
			}
		}

		return () => {
			if (hls) {
				hls.destroy();
			}
		};
	}, [videoEl, src]);

	// Capture video ref
	useEffect(() => {
		videoRef(videoEl);
	}, [videoEl]);

	if (notSupported) {
		return (
			<picture className="block w-full">
				<img className="block w-full" src={posterImage} />
			</picture>
		);
	}

	return (
		<div ref={container} className={classNames('block w-full', className)}>
			<video
				{...props}
				ref={videoEl}
				poster={posterImage}
				className={videoClassName}
				src={src}
				aria-label={altText}
			/>
		</div>
	);
};

export default Video;
