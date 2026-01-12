'use client';

import React, {useState} from 'react';
import {useKeenSlider} from 'keen-slider/react';
import TabNavigation from './TabNavigation';
import BackgroundMedia from './BackgroundMedia';
import Link from './Link';

export default function FullWidthHeroCarousel({slides = []}) {
	const [activeSlideIndex, setActiveSlideIndex] = useState(0);

	const [sliderRef, slider] = useKeenSlider({
		loop: true,
		drag: slides.length > 1,
		slides: {
			perView: 1,
			origin: 'center',
			spacing: 100,
		},
		slideChanged: s => {
			setActiveSlideIndex(s.track.details.rel);
		},
	});

	const onClickIndex = index => {
		if (!slider.current) return;
		slider.current.moveToIdx(index);
	};

	const onClickNext = () => {
		if (!slider.current) return;

		slider.current.next();
	};

	const onClickPrev = () => {
		if (!slider.current) return;

		slider.current.prev();
	};

	const slideColumns = slides.map(slide => (
		<div key={slide._key} className="keen-slider__slide">
			<div className="relative rounded-20 bg-black text-white overflow-hidden">
				<BackgroundMedia {...slide.background} />
				<div className="min-h-hero-80 p-2 flex flex-col justify-end text-white relative z-1">
					<div className="flex flex-col gap-half">
						{slide.subtitle && <p>{slide.subtitle}</p>}
						{slide.title && (
							<h2 className="text-24/32">{slide.title}</h2>
						)}
						{slide.cta && (
							<div className="flex">
								<Link
									{...slide.cta}
									className="block button button-primary"
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	));

	const carousel = (
		<div className="relative w-full">
			<div ref={sliderRef} className="keen-slider overflow-visible">
				{slideColumns}
			</div>
		</div>
	);

	const carouselNav = slides?.length > 1 && (
		<div className="max-w-full absolute bottom-2 right-2">
			<TabNavigation
				invert
				tabs={slides.map((slide, index) => index + 1)}
				activeIndex={activeSlideIndex}
				onChangeIndex={onClickIndex}
			/>
		</div>
	);

	return (
		<section className="my-2 px-container-desktop md:px-container-desktop overflow-hidden">
			<div className="relative">
				{carousel}
				{carouselNav}
			</div>
		</section>
	);
}
