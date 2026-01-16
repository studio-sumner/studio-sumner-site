import React, {Fragment, useEffect} from 'react';
import Seo from '../../components/Seo';
import {
	getAllProductLandingSlugs,
	getProductLandingById,
	getProductLandingBySlug,
	getSiteData,
} from '../../api/sanity';
import PageComponentList from '../../components/PageComponentList';
import ProductSchema from '../../components/ProductSchema';
import ProductHero from '../../components/ProductHero';
import mergeMeta from '../../utils/mergeMeta';
import config from '../../../config';

const {siteName} = config;

export const getStaticPaths = async () => {
	const allPageSlugs = await getAllProductLandingSlugs();

	return {
		paths: allPageSlugs.map(slug => ({
			params: {slug},
		})),
		fallback: 'blocking',
	};
};

export const getStaticProps = async ({params, preview, previewData}) => {
	const {slug} = params;

	const productRequest = preview
		? getProductLandingById(previewData.draftId)
		: getProductLandingBySlug(slug);

	const [site, product] = await Promise.all([getSiteData(), productRequest]);

	if (!site || !product) {
		return {notFound: true};
	}

	return {
		props: {
			...site,
			...product,
		},
		revalidate: 60,
	};
};

const Product = ({
	config = {},
	title,
	description = [],
	slug,
	mainImage,
	product,
	components = [],
	seo = {},
}) => {
	const defaultMeta = config.seo || {};
	const fallbackMeta = {
		metaTitle: `${title} - ${siteName}`,
		openGraphTitle: `${title} - ${siteName}`,
		twitterTitle: `${title} - ${siteName}`,
		openGraphImage: mainImage ? mainImage : defaultMeta.openGraphImage,
		twitterImage: mainImage ? mainImage : defaultMeta.twitterImage,
	};

	const meta = mergeMeta([defaultMeta, fallbackMeta, seo]);

	let schema = {};

	if (product?.variants?.length > 0) {
		schema = {
			title,
			sku: product.variants[0].sku,
			price: `${(product.variants[0].cents / 100).toFixed(2)}`,
			image: meta.openGraphImage.url,
			description: meta.metaDescription,
			slug,
		};
	}

	const hero = {
		title,
		mainImage,
		description,
		product,
	};

	return (
		<Fragment key={slug}>
			<Seo {...meta} />
			<ProductSchema {...schema} />
			<ProductHero {...hero} />
			<PageComponentList components={components} />
		</Fragment>
	);
};

export default Product;
