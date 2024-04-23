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

export const productLink = groq`{
	_key,
	_type,
	openInNewWindow,
	title,
	'productName': productLanding->title,
	'slug': productLanding->slug.current,
	featured,
}`;

export const collectionLink = groq`{
	_key,
	_type,
	openInNewWindow,
	title,
	'collectionName': collection->title,
	'slug': collection->slug.current,
	featured,
}`;

export const cta = groq`{
	...,
	_type == 'link' => ${link},
	_type == 'pageLink' => ${pageLink},
	_type == 'productLink' => ${productLink},
	_type == 'collectionLink' => ${collectionLink},
}`;

export const asset = groq`{
	_type,
	_key,
	...(asset->{
		'lqip': metadata.lqip,
		'dimensions': metadata.dimensions,
		url,
		alt,
	}),
}`;

export const video = groq`{
	...,
	asset->,
}`;

export const backgroundMedia = groq`{
	_type,
	_key,
	
	_type == 'backgroundImage' => {
		image ${asset},
		imageMobile ${asset},
	},

	_type == 'video' => {
		...(@-> {
			title,
			video ${video},
		}),
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
		video-> {
			title,
			video ${video},
		},
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
// === Products ===
//

export const price = groq`{
	amount,
	currencyCode,
}`;

export const productImage = groq`{
	_key,
	_type,
	src,
	alt,
	height,
	width,
	admin_graphql_api_id,
	product_id,
	variant_ids,
}`;

export const productVariant = groq`{
	_key,
	_id,
	productTitle,
	variantTitle,
	variantId,
	productId,
	sku,
	cents,
	price ${price},
	compareAtCents,
	inventoryQuantity,
	option1,
	option2,
	option3,
	image ${productImage},
	sellingPlanOptions[] {
		_key,
		priceAdjustments[] {
			_key,
			price ${price},
			compareAtPrice ${price},
			perDeliveryPrice ${price},
		},
		sellingPlan {
			id,
			name,
			description,
			recurringDeliveries,
			options[] {
				_key,
				name,
				value,
			},
		},
	}
}`;

export const product = groq`{
	_key,
	_id,
	title,
	'slug': slug.current,
	createdAt,
	deleted,
	productId,
	tags[],
	cents,
	options[] {
		_key,
		name,
		position,
		values[] {
			_key,
			name,
		},
	},
	variants[]-> ${productVariant},
	image ${productImage},
	images[] ${productImage},
	requiresSellingPlan,
}`;

export const productTile = groq`{
	_key,
	_id,
	title,
	'slug': slug.current,
	'cents': product->cents,
	mainImage ${asset},
	product-> ${product},
	descriptionTile ${richText},
	productLine,
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
		invert,
		title,
		subtitle,
		'cta': cta[0] ${cta},
		'background': background[0] ${backgroundMedia},
	},
`;

export const componentList = groq`[]{
	${components}

	// Unfurl global components into same list
	_type == 'globalComponentList' => {
		title,
		'components': @->components[] {${components}}
	}
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

export const productLandingItems = groq`
	_id,
	_type,
	title,
	'slug': slug.current,
	mainImage ${asset},
	images[] ${asset},
	product-> ${product},
	description ${richText},
	variantDropdowns[] {
		_key,
		optionTitle,
		optionType,
		description ${richText},
	},
	components ${componentList},
	seo ${seo},
`;

export const productLandingSlugs = groq`*[
	_type == "productLanding" &&
	staticBuild &&
	!(_id in path("drafts.**"))
].slug.current`;

export const productLandingBySlug = slug => groq`*[
	_type == "productLanding" &&
	slug.current == "${slug}" &&
	!(_id in path("drafts.**"))
][0] {
	${productLandingItems}
}`;

export const productLandingById = id => groq`*[
	_type == "productLanding" &&
	_id == "${id}"
][0] {
	${productLandingItems}
}`;

export const collectionItems = groq`
	_id,
	_type,
	title,
	'slug': slug.current,
	products[] -> ${productTile},
	components ${componentList},
`;

export const collectionSlugs = groq`*[
	_type == "collection" &&
	staticBuild &&
	!(_id in path("drafts.**"))
].slug.current`;

export const collectionBySlug = slug => groq`*[
	_type == "collection" &&
	slug.current == "${slug}" &&
	!(_id in path("drafts.**"))
][0] {
	${collectionItems}
}`;

export const collectionById = id => groq`*[
	_type == "collection" &&
	_id == "${id}"
][0] {
	${collectionItems}
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
		header-> {
			links[] ${cta},
		},

		footer-> {
			links[] ${cta},
		},
	},
}`;
