import React from 'react';
import Link from './Link';

export default function NotFound({title, cta}) {
	return (
		<div className="min-h-hero flex flex-col justify-center relative">
			<div className="px-container-mobile md:px-container-desktop py-4">
				<div className="grid grid-cols-12 gap-gutter-mobile md:gap-gutter-desktop">
					<div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-start-2 lg:col-span-6">
						<div className="flex flex-col gap-2">
							{title && <h1 className="text-center">{title}</h1>}
							{cta && (
								<div className="flex items-center justify-center">
									<Link {...cta} className="block" />
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
