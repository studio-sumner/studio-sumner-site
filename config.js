export default {
	// URL of publically hosted site
	siteUrl: process.env.NEXT_PUBLIC_SITE_ROOT,
	// Site title for SEO tags
	siteName: 'Sprout',
	// Short description for SEO tags
	siteDescription: '',
	// Meta keywords for SEO tags
	siteKeywords: '',
	// Twitter info for SEO
	siteTwitterAccount: '@sprout.store',

	// How much space you would like for #hash scrolls at the top. Generally this is the header + some buffer
	scrollBuffer: 100,
	// How many days should the site password last
	passwordDuration: 60,
	// Default Shopify country for currency
	defaultCountryId: 'US',

	// Various cookie keys for store
	cookieCartKey: 'sprout_cart_id',
	cookiePasswordKey: 'sprout_password',
	cookieCookieDisclosureKey: 'sprout_cookie_disclosure',
	cookieCountryKey: 'sprout_country',
};
