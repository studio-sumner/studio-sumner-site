import React from 'react';
import Link from './Link';

export default function Footer({footerColumns = []}) {
	const top = (
		<div className="flex">
			<Link url="/" title="Sprout" className="block">
				<img
					src="/icon-logo-header.svg"
					alt="Sprout Logo"
					className="block w-[131px] h-2"
				/>
			</Link>
		</div>
	);

	const menu = (
		<div className="grid grid-cols-12 gap-x-gutter-mobile md:gap-x-gutter-desktop gap-y-4">
			{footerColumns?.map(column => (
				<div
					key={column._key}
					className="col-span-6 md:col-span-3 flex flex-col gap-2">
					<h3 className="text-12/12 uppercase font-500">
						{column.title}
					</h3>
					<ul className="flex flex-col gap-half">
						{column.links?.map(link => (
							<li key={link._key}>
								<Link
									{...link}
									className="link-underline-hover"
								/>
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);

	return (
		<footer className="bg-gray-border mt-4 pt-4 pb-12">
			<div className="mx-auto max-w-grid ">
				<div className="px-container-mobile md:px-container-desktop flex flex-col gap-4">
					{top}
					{menu}
				</div>
			</div>
		</footer>
	);
}
