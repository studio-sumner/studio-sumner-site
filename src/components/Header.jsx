import React from 'react';
import Link from './Link';

export default function Header({links = []}) {
	return (
		<header className="sticky top-0 z-2 bg-white border-b border-solid border-gray-border">
			<div className="max-w-grid mx-auto">
				<div className="px-container-mobile md:px-container-desktop">
					<div className="grid grid-cols-12 items-center gap-x-gutter-mobile md:gap-x-gutter-desktop h-6">
						<div className="col-span-6 md:col-span-3">
							<Link url="/" title="Sprout" className="block">
								<img
									src="/icon-logo-header.svg"
									alt="Sprout Logo"
									className="block w-[131px] h-2"
								/>
							</Link>
						</div>
						<div className="col-span-6 hidden md:block">
							<ul className="flex justify-center items-center gap-2">
								{links?.map(link => (
									<li key={link._key}>
										<Link
											{...link}
											className="link-underline-hover"
										/>
									</li>
								))}
							</ul>
						</div>
						<div className="col-span-6 md:col-span-3">
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
