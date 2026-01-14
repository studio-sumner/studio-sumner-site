import React from 'react';
import ProductTile from './ProductTile';

export default function ProductGrid({title, products = []}) {
	return (
		<div className="my-4 md:my-8">
			<div className="mx-auto max-w-grid ">
				<div className="px-container-mobile md:px-container-desktop flex flex-col gap-1">
					{title && (
						<h2 className="text-24/32 md:text-36/48 md:tracking-tight">
							{title}
						</h2>
					)}

					<div className="grid grid-cols-2 lg:grid-cols-4 gap-x-gutter-mobile md:gap-x-gutter-desktop gap-y-4">
						{products?.map(product => (
							<ProductTile key={product._key} {...product} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
