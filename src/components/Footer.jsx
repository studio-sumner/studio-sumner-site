import React from 'react';
import Wordmark from './Wordmark';
import {riseClassName, riseStyle} from '../config/rise';

export default function Footer({
	wordmark,
	wordmarkMobile,
	copyright,
	riseStep = 1,
}) {
	return (
		<footer
			className={`@container mt-24 ${riseClassName}`}
			style={riseStyle(riseStep)}>
			<p className="font-display leading-[1.2] font-bold whitespace-nowrap text-wordmark uppercase">
				<Wordmark text={wordmarkMobile} className="block md:hidden" />
				<Wordmark text={wordmark} className="hidden md:block" />
			</p>
			{copyright && <p className="mt-2 text-muted">{copyright}</p>}
		</footer>
	);
}
