import React from 'react';
import Image from './Image';
import Link from './Link';
import ShopifyPrice from './ShopifyPrice';
import getVariantPriceRange from '../utils/getVariantPriceRange';

export default function ProductTile({title, slug, mainImage, product}) {
	const [minVariant] = getVariantPriceRange(product.variants);

	return (
		<div className="relative flex flex-col gap-2">
			<Image
				alt={title}
				src={{
					url: mainImage.url,
					w: 800,
				}}
				lqip={mainImage.lqip}
				className="w-full aspect-square"
			/>
			<p>
				<Link className="link-cover" url={`/products/${slug}`}>
					{title}
				</Link>
			</p>
			<p>
				<ShopifyPrice
					productId={minVariant.productId}
					variantId={minVariant._id}
					cents={minVariant.cents}
					compareAtCents={minVariant.compareAtCents}
					noTrailingZeros
				/>
			</p>
		</div>
	);
}
