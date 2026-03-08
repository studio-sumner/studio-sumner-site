import React from 'react';
import Link from './Link';

export default function NotFound({title, cta}) {
	return (
		<div className="min-h-hero flex flex-col justify-center relative">
			<div className="px-container-mobile md:px-container-desktop py-4">
				<div className="flex flex-col items-center justify-center gap-2">
					{title && (
						<h1 className="text-center text-24/32 md:text-36/48 md:tracking-tight">
							{title}
						</h1>
					)}
					{cta && (
						<div className="flex items-center justify-center">
							<Link
								{...cta}
								className="block button button-primary"
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
