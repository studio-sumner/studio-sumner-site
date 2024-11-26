import {definePlugin} from 'sanity';
import price from './types/price';
import product from './types/product';
import productImage from './types/productImage';
import productVariant from './types/productVariant';
import productVariantOption from './types/productVariantOption';
import productVariantOptionValue from './types/productVariantOptionValue';
import productVariantSellingPlanOption from './types/productVariantSellingPlanOption';

// Export plugin
export const shopify = definePlugin({
	name: 'sprout-ecommerce-shopify',
	schema: {
		types: [
			price,
			product,
			productImage,
			productVariant,
			productVariantOption,
			productVariantOptionValue,
			productVariantSellingPlanOption,
		],
	},
});

// Export queries for external use
export * as queries from './queries';
