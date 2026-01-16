import React from 'react';
import {MediaImage} from './Media';
import {PortableText} from '@portabletext/react';
import richText from '../serializers/richText';
import ProductHeroForm from './ProductHeroForm';

export default function ProductHero({
	title,
	mainImage,
	description = [],
	product,
}) {
	/*
    // == TODO: Remove ==
	// Remove this once you've added a Shopify product to the product landing
	// This code is not necessary and only needed for initial setup, because
    // `product` is a required field in the `productLanding` schema.
    // Replace with:
    // 
    // const form = <ProductHeroForm product={product} />;
    */
	let form;

	if (product) {
		form = <ProductHeroForm product={product} />;
	} else {
		form = (
			<button disabled className="block w-full button button-primary">
				[DEBUG] Shopify Product Missing
			</button>
		);
	}
	/* == TODO: Remove == */

	return (
		<div className="mt-container-mobile md:mt-container-desktop mb-4 md:mb-8">
			<div className="mx-auto max-w-grid">
				<div className="px-container-desktop md:px-container-desktop">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-gutter-mobile md:gap-x-gutter-desktop">
						<div className="overflow-hidden rounded-20">
							<MediaImage image={mainImage} />
						</div>

						<div className="md:mt-[20%] lg:pl-4 flex flex-col gap-1 md:max-w-46">
							<h1 className="text-24/32 md:text-36/48 md:tracking-tight">
								{title}
							</h1>

							{description?.length > 0 && (
								<div className="rich-text line-break">
									<PortableText
										value={description}
										components={richText}
									/>
								</div>
							)}

							{form}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
