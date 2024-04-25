import React from 'react';
import Emoji from 'a11y-react-emoji';
import {EditIcon, EyeOpenIcon} from '@sanity/icons';
import CmsIframePreview from '../components/CmsIframePreview.jsx';

const PREVIEW_URL = process.env.NEXT_PUBLIC_CMS_PREVIEW_URL;
const PREVIEW_TOKEN = process.env.NEXT_PUBLIC_CMS_PREVIEW_TOKEN;

const VariantIcon = () => <Emoji style={{fontSize: '2rem'}} symbol="🌷" />;
const ProductIcon = () => <Emoji style={{fontSize: '1.5em'}} symbol="🌹" />;
const GearIcon = () => <Emoji style={{fontSize: '1.5em'}} symbol="⚙️" />;
const ModuleIcon = () => <Emoji style={{fontSize: '1.5em'}} symbol="🧱" />;

export default S => {
	//
	// === Pages ===
	//

	const pageMenuItem = S.listItem()
		.title('Pages')
		.schemaType('page')
		.child(
			S.documentTypeList('page')
				.title('Pages')
				.child(documentId =>
					S.document()
						.documentId(documentId)
						.schemaType('page')
						.views([
							S.view.form().icon(EditIcon),
							S.view
								.component(CmsIframePreview)
								.options({
									previewURL: PREVIEW_URL,
									token: PREVIEW_TOKEN,
								})
								.title('Draft Preview')
								.icon(EyeOpenIcon),
						]),
				),
		);

	const modules = S.listItem()
		.title('Modules')
		.icon(ModuleIcon)
		.child(
			S.list()
				.title('Modules')
				.items([
					S.listItem()
						.title('Color Styles')
						.schemaType('colorStyle')
						.child(
							S.documentTypeList('colorStyle').title(
								'Color Styles',
							),
						),
					S.listItem()
						.title('Headers')
						.schemaType('header')
						.child(S.documentTypeList('header').title('Headers')),
					S.listItem()
						.title('Footers')
						.schemaType('footer')
						.child(S.documentTypeList('footer').title('Footers')),
					S.listItem()
						.title('Carts')
						.schemaType('cart')
						.child(S.documentTypeList('cart').title('Carts')),
					S.listItem()
						.title('404 Pages')
						.schemaType('notFound')
						.child(
							S.documentTypeList('notFound').title('404 Pages'),
						),
					S.listItem()
						.title('Promo Banners')
						.schemaType('promoBanner')
						.child(
							S.documentTypeList('promoBanner').title(
								'Promo Banners',
							),
						),
					S.listItem()
						.title('Cookie Banners')
						.schemaType('cookieBanner')
						.child(
							S.documentTypeList('cookieBanner').title(
								'Cookie Banners',
							),
						),
					S.listItem()
						.title('Global Components')
						.schemaType('globalComponentList')
						.child(
							S.documentTypeList('globalComponentList').title(
								'Global Components',
							),
						),
					S.listItem()
						.title('Drawers (Global)')
						.schemaType('drawerGlobal')
						.child(
							S.documentTypeList('drawerGlobal').title(
								'Drawers (Global)',
							),
						),
					S.listItem()
						.title('Videos')
						.schemaType('video')
						.child(S.documentTypeList('video').title('Videos')),
				]),
		);

	const layouts = S.listItem()
		.title('Layouts')
		.schemaType('layout')
		.child(
			S.documentTypeList('layout')
				.title('Layouts')
				.child(documentId =>
					S.document().documentId(documentId).schemaType('layout'),
				),
		);

	//
	// === Collections ===
	//

	const collectionMenuItem = S.listItem()
		.title('Collections')
		.schemaType('collection')
		.child(
			S.documentTypeList('collection')
				.title('Collections')
				.child(documentId =>
					S.document()
						.documentId(documentId)
						.schemaType('collection')
						.views([
							S.view.form().icon(EditIcon),
							S.view
								.component(CmsIframePreview)
								.options({
									previewURL: PREVIEW_URL,
									token: PREVIEW_TOKEN,
								})
								.title('Draft Preview')
								.icon(EyeOpenIcon),
						]),
				),
		);

	//
	// === Products ===
	//

	const variantsByProduct = S.listItem()
		.title('By Product')
		.icon(VariantIcon)
		.child(
			S.documentList()
				.title('Products')
				.menuItems(S.documentTypeList('product').getMenuItems())
				.filter('_type == $type && !defined(parents)')
				.params({type: 'product'})
				.child(productId =>
					S.documentList()
						.title('Variants')
						.menuItems(
							S.documentTypeList('productVariant').getMenuItems(),
						)
						.filter('_type == $type && productId == $productId')
						.params({
							type: 'productVariant',
							productId: Number(productId),
						}),
				),
		);

	const orphanedVariants = S.listItem()
		.title('Orphaned')
		.icon(VariantIcon)
		.child(
			S.documentList()
				.title('Variants')
				.menuItems(S.documentTypeList('productVariant').getMenuItems())
				.filter(
					'_type == $type && count(*[ _type == "product" && references(^._id)]) == 0 && !(_id in path("drafts.**"))',
				)
				.params({type: 'productVariant'}),
		);

	const allShopifyVariants = S.listItem()
		.title('All Variants')
		.icon(VariantIcon)
		.child(
			S.documentList()
				.title('Variants')
				.menuItems(S.documentTypeList('productVariant').getMenuItems())
				.filter('_type == $type')
				.params({type: 'productVariant'}),
		);

	const variantsMenuItem = S.listItem()
		.title('Product Variants')
		.icon(VariantIcon)
		.child(
			S.list()
				.title('Product Variants')
				.items([
					variantsByProduct,
					orphanedVariants,
					allShopifyVariants,
				]),
		);

	const productLandings = S.listItem()
		.title('Product Landings')
		.schemaType('productLanding')
		.child(
			S.documentTypeList('productLanding')
				.title('Product Landings')
				.child(documentId =>
					S.document()
						.documentId(documentId)
						.schemaType('productLanding')
						.views([
							S.view.form().icon(EditIcon),
							S.view
								.component(CmsIframePreview)
								.options({
									previewURL: PREVIEW_URL,
									token: PREVIEW_TOKEN,
								})
								.title('Draft Preview')
								.icon(EyeOpenIcon),
						]),
				),
		);

	const productsMenuItem = S.listItem()
		.title('Products')
		.icon(ProductIcon)
		.child(
			S.documentList()
				.title('Products')
				.menuItems(S.documentTypeList('product').getMenuItems())
				.filter('_type == $type')
				.params({type: 'product'}),
		);

	const productMenuItem = S.listItem()
		.title('Products')
		.icon(ProductIcon)
		.child(
			S.list()
				.title('Products')
				.items([
					productLandings,
					S.divider(),
					productsMenuItem,
					variantsMenuItem,
				]),
		);

	//
	// === Other Document Types ===
	//

	//
	// === Config ===
	//

	const configParent = S.listItem()
		.title('Config')
		.icon(GearIcon)
		.child(
			S.list()
				.title('Config')
				.items([
					S.documentListItem()
						.id('globalConfig')
						.title('Global Config')
						.schemaType('globalConfig'),
					S.listItem()
						.title('Redirects')
						.schemaType('redirect')
						.child(
							S.documentTypeList('redirect').title('Redirects'),
						),
				]),
		);

	//
	// === Structure ===
	//
	return S.list().title('Content').items([
		pageMenuItem,
		layouts,
		modules,

		// ECOMMERCE
		S.divider(),
		collectionMenuItem,
		productMenuItem,

		S.divider(),
		configParent,
	]);
};
