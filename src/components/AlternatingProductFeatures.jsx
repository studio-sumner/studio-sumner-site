import React from 'react';
import cx from 'classnames';
import Media from './Media';
import {PortableText} from '@portabletext/react';
import richText from '../serializers/richText';

export default function AlternatingProductFeatures({features = []}) {
	const featureRows = features?.map((feature, index) => (
		<div key={feature._key}>
			<div className="grid grid-cols-2 gap-x-gutter-mobile md:gap-x-gutter-desktop gap-y-2">
				<div
					className={cx('col-span-2 md:col-span-1', {
						'md:order-2': index % 2 === 1,
					})}>
					{feature.media && (
						<div className="rounded-20 overflow-hidden">
							<Media {...feature.media} />
						</div>
					)}
				</div>
				<div
					className={cx('col-span-2 md:col-span-1', {
						'md:order-1': index % 2 === 1,
					})}>
					<div className="h-full flex flex-col gap-1 justify-center md:max-w-46 lg:px-4">
						{feature.title && (
							<h2 className="text-24/32 md:text-36/48 md:tracking-tight">
								{feature.title}
							</h2>
						)}

						{feature.description?.length > 0 && (
							<div className="rich-text line-break">
								<PortableText
									value={feature.description}
									components={richText}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	));

	return (
		<div className="my-4 md:my-8 px-container-desktop md:px-container-desktop">
			<div className="flex flex-col gap-4">{featureRows}</div>
		</div>
	);
}
