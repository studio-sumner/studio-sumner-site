import React, {Fragment} from 'react';
import Seo from '../components/Seo';
import PageComponentList from '../components/PageComponentList';
import {
	getPageBySlug,
	getPageById,
	getSiteData,
	getAllPageSlugs,
} from '../api/sanity';
import mergeMeta from '../utils/mergeMeta';
import config from '../../config';

const {siteName} = config;

export const getStaticPaths = async () => {
	const allPageSlugs = await getAllPageSlugs();

	return {
		paths: allPageSlugs.map(slug => ({
			params: {slug},
		})),
		fallback: 'blocking',
	};
};

export const getStaticProps = async ({params, preview, previewData}) => {
	const {slug} = params;

	const pageRequest = preview
		? getPageById(previewData.draftId)
		: getPageBySlug(slug);

	const [site, page] = await Promise.all([getSiteData(), pageRequest]);

	if (!site || !page) {
		return {notFound: true};
	}

	return {
		props: {
			...site,
			...page,
		},
		revalidate: 60,
	};
};

const Page = ({
	config = {},
	slug,
	title,
	seo = {},
	components = [],
	layout,
}) => {
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
			<PageComponentList key={slug} components={components} />
		</Fragment>
	);
};

export default Page;
