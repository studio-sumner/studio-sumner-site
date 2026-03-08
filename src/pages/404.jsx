import React, {Fragment} from 'react';
import Seo from '../components/Seo';
import NotFound from '../components/NotFound';
import {getNotFoundPage, getSiteData} from '../api/sanity';
import mergeMeta from '../utils/mergeMeta';
import config from '../../config';

const {siteName} = config;

export const getStaticProps = async ({params}) => {
	const [site, config] = await Promise.all([
		getSiteData(),
		getNotFoundPage(),
	]);
	const {notFoundPage} = config.layout;

	return {
		props: {
			...site,
			...notFoundPage,
		},
		revalidate: 60,
	};
};

const NotFoundPage = ({config = {}, title, cta, seo = {}}) => {
	const defaultMeta = config.seo || {};

	const fallbackMeta = {
		metaTitle: `Not Found - ${siteName}`,
		openGraphTitle: `Not Found - ${siteName}`,
		twitterTitle: `Not Found - ${siteName}`,
	};

	const meta = mergeMeta([defaultMeta, fallbackMeta, seo]);

	return (
		<Fragment>
			<Seo {...meta} />
			<NotFound title={title} cta={cta} />
		</Fragment>
	);
};

export default NotFoundPage;
