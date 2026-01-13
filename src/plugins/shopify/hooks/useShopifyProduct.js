import {useState, useEffect} from 'react';
import {encode, decode} from '../utils/shopifyGid';
import {fetchProduct} from '../api/shopifyStorefront';
import find from 'lodash/find';

export default (productId, activeVariantId, activeCountryId = 'US') => {
	const [loadingInventory, setLoading] = useState(false);
	const [shopifyProduct, setShopifyProduct] = useState(null);
	const [error, setError] = useState(null);

	const shopifyVariant = shopifyProduct
		? find(
				shopifyProduct.variants,
				variant => decode(variant.id).id === activeVariantId,
			)
		: null;

	// Fetch Product
	useEffect(() => {
		if (!productId) return;

		const shopifyId = encode('Product', productId, {
			accessToken:
				process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
		});

		setLoading(true);

		fetchProduct(shopifyId, activeCountryId)
			.then(product => {
				setShopifyProduct(product);
				setLoading(false);
			})
			.catch(error => {
				console.log(`Error fetching product: ${productId}`);
				setError(error);
				setLoading(false);
			});
	}, [productId, activeCountryId]);

	return {shopifyProduct, shopifyVariant, error, loadingInventory};
};
