import groq from 'groq';

//
// === Components ===
//

export const link = groq`{
	_key,
	_type,
	openInNewWindow,
	title,
	url,
	featured,
}`;

export const pageLink = groq`{
	_key,
	_type,
	openInNewWindow,
	title,
	'pageName': page->title,
	'slug': page->slug.current,
	featured,
}`;

export const cta = groq`{
	_type == 'link' => ${link},
	_type == 'pageLink' => ${pageLink},
}`;

export const asset = groq`{
	_type,
	_key,
	...(asset->{
		'lqip': metadata.lqip,
		'dimensions': metadata.dimensions,
		'alt': altText,
		url,
	}),
}`;

export const video = groq`{
	_id,
	_type,
	title,
	altText,
	video {
		...,
		asset->,
	}
}`;

export const colorStyle = groq`{
	_key,
	title,

	'style': style[0] {
		_type,

		_type == 'color' => {
			...,
		},

		_type == 'ombre' => {
			style,
		},
	}
}`;

export const backgroundMedia = groq`{
	_type,
	_key,
	
	_type == 'backgroundImage' => {
		image ${asset},
		imageMobile ${asset},
	},

	_type == 'video' => {
		...(@-> ${video}),
	},
}`;

export const media = groq`{
	_type,
	_key,
	
	_type == 'mediaImage' => {
		image ${asset},
	},

	_type == 'mediaVideo' => {
		showControls,
		video-> ${video},
	},
}`;

export const richText = groq`[]{
	...,
	
	asset->{
		'lqip': metadata.lqip,
		'dimensions': metadata.dimensions,
		url,
		alt,
	},

	'markDefs': coalesce(markDefs[] {
		...,

		_type == 'textColor' => {
			...,
			color-> ${colorStyle},
		},
	}, []),
}`;

export const seo = groq`{
	hideFromSitemap,
	disallowRobots,
	metaTitle,
	metaDescription,
	metaKeywords,
	openGraphTitle,
	openGraphDescription,
	openGraphImage ${asset},
	twitterTitle,
	twitterDescription,
	twitterImage ${asset},
}`;

//
// === Page Components ===
//

export const components = groq`
	_type,
	_key,

	_type == 'iframeEmbed' => {
		'code': content.code,
	},

	_type == 'heroFullWidthImage' => {
		slides[] {
			_key,
			title,
			subtitle,
			'cta': cta[0] ${cta},
			'background': background[0] ${backgroundMedia},
		},
	},

	_type == 'fullWidthHeroCarousel' => {
		slides[] {
			_key,
			title,
			subtitle,
			'cta': cta[0] ${cta},
			'background': background[0] ${backgroundMedia},
		},
	},

	_type == 'ticker' => {
		description ${richText},
	},

	_type == 'pageRichText' => {
		title,
		description ${richText},
	},

	_type == 'statement' => {
		text,
	},

	_type == 'clientsAndServices' => {
		clientsTitle,
		clients,
		servicesTitle,
		services[] {
			_key,
			name,
			detail,
		},
	},

	_type == 'details' => {
		items[] {
			_key,
			title,
			text,
		},
	},
`;

export const componentList = groq`[]{
	${components}

	// Unfurl global components into same list
	_type == 'globalComponentList' => {
		title,
		'components': @->components[] {${components}}
	},
}`;

//
// === Documents ===
//

export const pageItems = groq`
	_id,
	_type,
	title,
	'slug': slug.current,
	components ${componentList},
	seo ${seo},
`;

// Get homepage from active layout
export const homepage = groq`*[
	_type == "globalConfig" &&
	!(_id in path("drafts.**"))
][0] {
	layout->{
		homepage->{${pageItems}},
	},
}`;

export const notFoundPage = groq`*[
	_type == "globalConfig" &&
	!(_id in path("drafts.**"))
][0] {
	layout->{
		notFoundPage->{
			title,
			'cta': cta[0] ${cta},
			'background': background[0] ${backgroundMedia},
		},
	},
}`;

export const pageSlugs = groq`*[
	_type == "page" &&
	staticBuild &&
	!(_id in path("drafts.**"))
].slug.current`;

export const pageBySlug = slug => groq`*[
	_type == "page" &&
	slug.current == "${slug}" &&
	!(_id in path("drafts.**"))
][0] {
	${pageItems}
}`;

export const pageById = id => groq`*[
	_type == "page" &&
	_id == "${id}"
][0] {
	${pageItems}
}`;

//
// === Globals ===
//

export const globalConfig = groq`*[
	_type == "globalConfig" &&
	_id == "globalConfig"
][0] {
	enablePassword,
	password,
	seo ${seo},
}`;

export const layout = groq`*[
	_type == "globalConfig" &&
	_id == "globalConfig"
][0] {
	layout-> {
		promoBanner->{
			description ${richText},
			backgroundColor-> ${colorStyle},
			invertTextColor,
		},

		header-> {
			siteTitle,
			navItems[] {
				_key,
				title,
				url,
				'pageId': page._ref,
				'slug': page->slug.current,
			},
		},

		'homepageId': homepage._ref,

		footer-> {
			wordmark,
			wordmarkMobile,
			copyright,
		},
	},
}`;
