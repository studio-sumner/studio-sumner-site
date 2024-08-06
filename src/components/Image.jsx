import React, {useState} from 'react';
import cx from 'classnames';
import sanityImageUrl from '../utils/sanityImageUrl';
import isString from 'lodash/isString';
import useScrollIntoView from '../hooks/useScrollIntoView';
import shopifyImageUrl from '../utils/shopifyImageUrl';

export default function Image({
	alt,
	lqip,
	src,
	sources = [],
	className,
	imgProps = {},
	pictureProps = {},
	lazy = true,
	lazyThreshold = 2, // within 2 viewport heights
	lazyBlur = true,
	...props
}) {
	const [isLoaded, setIsLoaded] = useState(false);
	const {hasSeen, ref} = useScrollIntoView(lazyThreshold);
	const fullResolutionEnabled = !lazy || (lazy && hasSeen);
	const showFullResolution = !lazy || (lazy && hasSeen && isLoaded);

	const handleLoad = () => {
		requestAnimationFrame(() => {
			setIsLoaded(true);
		});
	};

	const sourceTags =
		fullResolutionEnabled &&
		sources.map((source, index) => {
			const {media, ...config} = source;
			let srcSet;

			if (config.srcSet) {
				srcSet = config.srcSet;
			} else if (config.type === 'shopifyImage') {
				srcSet = shopifyImageUrl(source.url, config);
			} else if (config.url) {
				srcSet = sanityImageUrl(source.url, config);
			}

			return <source key={index} srcSet={srcSet} media={media} />;
		});

	let imageUrl;

	if (isString(src)) {
		imageUrl = src;
	} else if (src.type === 'shopifyImage') {
		const {...config} = src;
		imageUrl = shopifyImageUrl(src.url, config);
	} else if (src.url) {
		const {...config} = src;
		imageUrl = sanityImageUrl(src.url, config);
	} else {
		console.warn('Image is missing src.');
	}

	const {className: imgClassName, ...restImgProps} = imgProps;

	const imgTag = (
		<img
			{...restImgProps}
			className={cx(imgClassName, {
				'scale-105': !showFullResolution && lazyBlur,
				'blur-lg': !showFullResolution && lazyBlur,
				'opacity-0': !showFullResolution && !lazyBlur,
			})}
			src={fullResolutionEnabled ? imageUrl : lqip}
			alt={alt}
			onLoad={fullResolutionEnabled ? handleLoad : null}
		/>
	);

	return (
		<div
			ref={ref}
			className={cx('image overflow-hidden', className)}
			{...props}>
			<picture {...pictureProps}>
				{sourceTags}
				{imgTag}
			</picture>
		</div>
	);
}
