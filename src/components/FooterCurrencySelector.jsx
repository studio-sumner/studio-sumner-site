import React from 'react';
import useCart from '../hooks/useCart';

export default function FooterCurrencySelector() {
	const {
		isHydratingAvailableCountries,
		availableCountries,
		activeCountryId,
		updateCartCountry,
	} = useCart();

	const showCountrySelect = Boolean(
		!isHydratingAvailableCountries &&
			availableCountries &&
			availableCountries.length,
	);

	const onChangeCountry = event => {
		updateCartCountry(event.target.value);
	};

	const header = <p>Currency:</p>;

	const loadingState = isHydratingAvailableCountries && <p>Loading…</p>;

	const countrySelect = showCountrySelect && (
		<select value={activeCountryId} onChange={onChangeCountry}>
			{availableCountries.map(country => (
				<option key={country.isoCode} value={country.isoCode}>
					{country.isoCode} {country.currency.symbol}
				</option>
			))}
		</select>
	);

	return (
		<div className="flex flex-col gap-1">
			{header}
			{loadingState}
			{countrySelect}
		</div>
	);
}
