import axios from 'axios';
import {
	productById,
	cartCreate,
	cartById,
	cartLinesAdd,
	cartLinesUpdate,
	cartAttributesUpdate,
	cartNoteUpdate,
	availableCountries,
	cartBuyerIdentityUpdate,
} from './shopifyQueries';
import removeGraphEdgesNode from '../utils/removeGraphEdgesNode';

const HEADERS = {
	'Content-Type': 'application/json',
	'X-Shopify-Storefront-Access-Token':
		process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
};

export const client = axios.create({
	baseURL: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_URL,
	headers: HEADERS,
});

export const preparePayload = (query, variables = {}) => ({
	query,
	variables,
});

export const fetchProduct = async (id, countryCode = 'US') => {
	try {
		const payload = preparePayload(productById, {id, countryCode});

		const response = await client.post('', payload);

		return removeGraphEdgesNode(response.data.data).product;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const fetchAvailableCountries = async () => {
	try {
		const payload = preparePayload(availableCountries);

		const response = await client.post('', payload);

		return removeGraphEdgesNode(response.data.data).localization
			.availableCountries;
	} catch (error) {
		console.log(error);
		return [];
	}
};

export const createCart = async countryId => {
	try {
		const payload = preparePayload(cartCreate(countryId));

		const response = await client.post('', payload);

		return removeGraphEdgesNode(response.data.data).cartCreate.cart;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const fetchCart = async id => {
	try {
		const payload = preparePayload(cartById, {id});

		const response = await client.post('', payload);

		return removeGraphEdgesNode(response.data.data).cart;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const addCartLineItems = async (cartId, lines = []) => {
	try {
		const payload = preparePayload(cartLinesAdd, {cartId, lines});

		const response = await client.post('', payload);

		return removeGraphEdgesNode(response.data.data).cartLinesAdd.cart;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const updateCartLineItems = async (cartId, lines = []) => {
	try {
		const payload = preparePayload(cartLinesUpdate, {cartId, lines});

		const response = await client.post('', payload);

		return removeGraphEdgesNode(response.data.data).cartLinesUpdate.cart;
	} catch (error) {
		console.log(error);
		return null;
	}
};
export const updateCartAttributes = async (cartId, attributes = []) => {
	try {
		const payload = preparePayload(cartAttributesUpdate, {
			cartId,
			attributes,
		});

		const response = await client.post('', payload);

		return removeGraphEdgesNode(response.data.data).cartAttributesUpdate
			.cart;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const updateCartNote = async (cartId, note = '') => {
	try {
		const payload = preparePayload(cartNoteUpdate, {
			cartId,
			note,
		});

		const response = await client.post('', payload);

		return removeGraphEdgesNode(response.data.data).cartNoteUpdate.cart;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const updateCartCountry = async (cartId, countryCode = 'US') => {
	try {
		const payload = preparePayload(cartBuyerIdentityUpdate, {
			cartId,
			buyerIdentity: {countryCode},
		});

		const response = await client.post('', payload);

		return removeGraphEdgesNode(response.data.data).cartBuyerIdentityUpdate
			.cart;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export default {
	client,
	fetchProduct,
	fetchAvailableCountries,
	createCart,
	fetchCart,
	addCartLineItems,
	updateCartLineItems,
	updateCartAttributes,
	updateCartNote,
	updateCartCountry,
};
