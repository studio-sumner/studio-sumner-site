import React, {useState, useEffect} from 'react';
import Loader from './Loader';

const LOADER_TIMEOUT = 2000;

export default function PageComponentLoader({timeout = LOADER_TIMEOUT}) {
	const [showIndicator, setShowIndicator] = useState(false);

	// Show indicator
	useEffect(() => {
		setTimeout(() => {
			setShowIndicator(true);
		}, timeout);
	}, []);

	const indicator = showIndicator && <Loader />;

	return (
		<div className="min-h-screen flex flex-col justify-center items-center">
			{indicator}
		</div>
	);
}
