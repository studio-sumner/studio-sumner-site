import React from 'react';
import Head from 'next/head';
import config from '../../config';

const ProductSchema = ({title, sku, price, image, description, slug}) => {
	const schema = {
		'@context': 'https://schema.org/',
		'@type': 'Product',
		name: title,
		image: image,
		description: description,
		sku: sku,
		mpn: sku,
		brand: {
			'@type': 'Thing',
			name: config.siteName,
		},
		offers: {
			'@type': 'Offer',
			url: `${config.siteUrl}/products/${slug}`,
			priceCurrency: 'USD',
			price: price,
			itemCondition: 'https://schema.org/NewCondition',
			availability: 'https://schema.org/InStock',
			seller: {
				'@type': 'Organization',
				name: config.siteName,
			},
		},
	};

	return (
		<Head>
			<script type="application/ld+json">{JSON.stringify(schema)}</script>
		</Head>
	);
};

export default ProductSchema;
