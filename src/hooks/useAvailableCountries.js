import {useState, useEffect} from 'react';
import {fetchAvailableCountries} from '../api/shopifyStorefront';

export default (productId, activeVariantId) => {
	const [isLoading, setLoading] = useState(false);
	const [availableCountries, setAvailableCountries] = useState([]);
	const [error, setError] = useState(null);

	// Fetch countries
	useEffect(() => {
		setLoading(true);

		fetchAvailableCountries()
			.then(countries => {
				setAvailableCountries(countries);
				setLoading(false);
			})
			.catch(error => {
				console.log('Error fetching available countries');
				setError(error);
				setLoading(false);
			});
	}, []);

	return {availableCountries, isLoading, error};
};
