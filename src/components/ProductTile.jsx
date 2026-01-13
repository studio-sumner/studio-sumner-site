import React from 'react';
import Image from './Image';
import Link from './Link';
import ShopifyPrice from './ShopifyPrice';
import getVariantPriceRange from '../utils/getVariantPriceRange';

export default function ProductTile({title, slug, mainImage, product}) {
	let minVariant;

	if (product && product.variants && product.variants.length > 0) {
		[minVariant] = getVariantPriceRange(product.variants);
	}

	return (
		<div className="relative flex flex-col gap-1">
			<div className="overflow-hidden rounded-20">
				<Image
					alt={title}
					src={{
						url: mainImage.url,
						w: 800,
					}}
					lqip={mainImage.lqip}
					className="w-full aspect-square"
				/>
			</div>
			<div className="flex justify-between gap-2">
				<p>
					<Link className="link-cover" url={`/products/${slug}`}>
						{title}
					</Link>
				</p>
				{minVariant && (
					<p>
						<ShopifyPrice
							productId={minVariant.productId}
							variantId={minVariant._id}
							cents={minVariant.cents}
							compareAtCents={minVariant.compareAtCents}
							noTrailingZeros
						/>
					</p>
				)}
			</div>
		</div>
	);
}
