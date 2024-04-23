import {useState, useEffect} from 'react';

const DEFAULT_OPTIONS = {
	autoPlay: false,
	loop: false,
	muted: false,
};

export default (videoRef, playerOptions = {}) => {
	const options = {
		...DEFAULT_OPTIONS,
		...playerOptions,
	};

	const [isEnded, setIsEnded] = useState(false);
	const [isPlaying, setIsPlaying] = useState(options.autoPlay);
	const [isMuted, setIsMuted] = useState(options.muted);
	const [currentTime, setCurrentTime] = useState(0);
	const [totalTime, setTotalTime] = useState(0);

	const togglePlay = () => {
		if (!videoRef.current) return;

		if (isPlaying) {
			videoRef.current.pause();
		} else if (isEnded && !options.loop) {
			videoRef.current.currentTime = 0;
			videoRef.current.play();
		} else {
			videoRef.current.play();
		}
	};

	const toggleMute = () => {
		if (!videoRef.current) return;

		if (isMuted) {
			setIsMuted(false);
			videoRef.current.muted = false;
		} else {
			setIsMuted(true);
			videoRef.current.muted = true;
		}
	};

	// Video events
	useEffect(() => {
		if (!videoRef.current) return;

		const onLoadedMetadata = () => {
			if (!videoRef.current) return;

			setCurrentTime(videoRef.current.currentTime);
			setTotalTime(videoRef.current.duration);
		};

		const onTimeUpdate = () => {
			if (!videoRef.current) return;

			setCurrentTime(videoRef.current.currentTime);
			setTotalTime(videoRef.current.duration);
			setIsEnded(false);
		};

		const onPlay = () => {
			setIsPlaying(true);
			setIsEnded(false);
		};

		const onPause = () => {
			setIsPlaying(false);
		};

		const onEnded = () => {
			if (!options.loop) {
				setIsPlaying(false);
				setIsEnded(true);
			}
		};

		videoRef.current.addEventListener('loadedmetadata', onLoadedMetadata);
		videoRef.current.addEventListener('timeupdate', onTimeUpdate);
		videoRef.current.addEventListener('play', onPlay);
		videoRef.current.addEventListener('pause', onPause);
		videoRef.current.addEventListener('ended', onEnded);

		return () => {
			videoRef.current.removeEventListener(
				'loadedmetadata',
				onLoadedMetadata,
			);
			videoRef.current.removeEventListener('timeupdate', onTimeUpdate);
			videoRef.current.removeEventListener('play', onPlay);
			videoRef.current.removeEventListener('pause', onPause);
			videoRef.current.removeEventListener('ended', onEnded);
		};
	}, [videoRef.current]);

	return {isPlaying, isMuted, currentTime, totalTime, togglePlay, toggleMute};
};
