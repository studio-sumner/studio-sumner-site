import React, {Fragment, useEffect} from 'react';
import Seo from '../../components/Seo';
import {
	getAllCollectionSlugs,
	getCollectionById,
	getCollectionBySlug,
	getSiteData,
} from '../../api/sanity';
import mergeMeta from '../../utils/mergeMeta';
import PageComponentList from '../../components/PageComponentList';
import ProductGrid from '../../components/ProductGrid';
import config from '../../../config';

const {siteName} = config;

export const getStaticPaths = async () => {
	const allPageSlugs = await getAllCollectionSlugs();

	return {
		paths: allPageSlugs.map(slug => ({
			params: {slug},
		})),
		fallback: 'blocking',
	};
};

export const getStaticProps = async ({params, preview, previewData}) => {
	const {slug} = params;

	const collectionRequest = preview
		? getCollectionById(previewData.draftId)
		: getCollectionBySlug(slug);

	const [site, collection] = await Promise.all([
		getSiteData(),
		collectionRequest,
	]);

	if (!site || !collection) {
		return {notFound: true};
	}

	return {
		props: {
			...site,
			...collection,
		},
		revalidate: 60,
	};
};

const Collection = ({
	config = {},
	slug,
	title,
	products = [],
	components = [],
	seo = {},
}) => {
	//
	// === Update Meta ===
	//
	const defaultMeta = config.seo || {};
	const fallbackMeta = {
		metaTitle: `${title} - ${siteName}`,
		openGraphTitle: `${title} - ${siteName}`,
		twitterTitle: `${title} - ${siteName}`,
	};

	const meta = mergeMeta([defaultMeta, fallbackMeta, seo]);

	return (
		<Fragment>
			<Seo {...meta} />
			<ProductGrid title={title} products={products} />
			<PageComponentList key={slug} components={components} />
		</Fragment>
	);
};

export default Collection;
