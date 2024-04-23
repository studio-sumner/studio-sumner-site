import React from 'react';
import config from '../../config';
import Head from 'next/head';
import {useRouter} from 'next/router';
import sanityImageUrl from '../utils/sanityImageUrl';

const Seo = ({
	metaTitle = config.siteName,
	metaDescription = config.siteDescription,
	metaKeywords = config.siteKeywords,
	openGraphTitle = config.siteName,
	openGraphDescription,
	openGraphImage,
	twitterUser = config.siteTwitterAccount,
	twitterTitle = config.siteName,
	twitterDescription,
	twitterImage,
	siteName = config.siteName,
	siteUrl = config.siteUrl,
	disallowRobots,
}) => {
	const {asPath} = useRouter();

	return (
		<Head>
			{metaTitle && <title>{metaTitle}</title>}
			{metaDescription && (
				<meta name="description" content={metaDescription} />
			)}
			<meta name="keywords" content={metaKeywords} />

			<meta property="og:url" content={`${siteUrl}${asPath}`} />
			<meta property="og:title" content={openGraphTitle} />
			<meta property="og:site_name" content={siteName} />
			<meta property="og:description" content={openGraphDescription} />
			{openGraphImage && (
				<meta
					property="og:image"
					content={sanityImageUrl(openGraphImage.url, {
						w: 1200,
						format: 'png',
					})}
				/>
			)}

			<meta name="twitter:site" content={twitterUser} />
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={twitterTitle} />
			<meta name="twitter:description" content={twitterDescription} />
			<meta name="twitter:url" content={`${siteUrl}${asPath}`} />
			{twitterImage && (
				<meta
					name="twitter:image"
					content={sanityImageUrl(twitterImage.url, {
						w: 1200,
						format: 'png',
					})}
				/>
			)}
			{disallowRobots && (
				<meta name="robots" content="noindex, nofollow" />
			)}
			<link rel="canonical" href={`${siteUrl}${asPath}`} />
		</Head>
	);
};

export default Seo;
