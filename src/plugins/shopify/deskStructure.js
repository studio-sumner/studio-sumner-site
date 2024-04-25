import React from 'react';
import Emoji from 'a11y-react-emoji';

const VariantIcon = () => <Emoji style={{fontSize: '2rem'}} symbol="🌷" />;
const ProductIcon = () => <Emoji style={{fontSize: '1.5em'}} symbol="🌹" />;

export const shopifyProductDeskItems = S => {
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

	return [productsMenuItem, variantsMenuItem];
};
