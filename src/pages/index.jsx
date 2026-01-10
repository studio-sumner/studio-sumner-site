import React, {Fragment} from 'react';
import Seo from '../components/Seo';
import PageComponentList from '../components/PageComponentList';
import {getHomepage, getSiteData} from '../api/sanity';
import mergeMeta from '../utils/mergeMeta';

export const getStaticProps = async ({params}) => {
	const [site, config] = await Promise.all([getSiteData(), getHomepage()]);
	const {homepage} = config.layout;

	return {
		props: {
			...site,
			...homepage,
		},
		revalidate: 60,
	};
};

const Homepage = ({config = {}, title, seo = {}, components = [], layout}) => {
	const defaultMeta = config.seo || {};

	const meta = mergeMeta([defaultMeta, seo]);

	return (
		<Fragment>
			<Seo {...meta} />
			<PageComponentList components={components} />
			<div className="px-2">
				<a className="link-underline">sup</a>
			</div>
		</Fragment>
	);
};

export default Homepage;
