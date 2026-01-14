import React from 'react';
import {PortableText} from '@portabletext/react';
import richText from '../serializers/richText';

export default function PageRichText({title, description = []}) {
	return (
		<div className="my-4 md:my-8 px-container-desktop md:px-container-desktop">
			<div className="mx-auto max-w-grid">
				<div className="grid grid-cols-12 gap-x-gutter-mobile md:gap-x-gutter-desktop">
					<div className="col-span-12 md:col-span-8 lg:col-span-6 md:col-start-3 lg:col-start-4">
						<div className="flex flex-col gap-2">
							{title && (
								<h2 className="text-24/32 md:text-36/48 md:tracking-tight">
									{title}
								</h2>
							)}
							{description?.length > 0 && (
								<div className="rich-text line-break">
									<PortableText
										value={description}
										components={richText}
									/>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
