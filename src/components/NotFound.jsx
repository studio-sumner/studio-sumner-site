import React from 'react';
import NextLink from 'next/link';
import Grid from './Grid';
import {riseClassName, riseStyle} from '../config/rise';

export default function NotFound({title, cta}) {
	const href = cta?._type === 'pageLink' ? `/${cta.slug}` : cta?.url;

	return (
		<Grid
			as="section"
			className={`mt-24 ${riseClassName}`}
			style={riseStyle(1)}>
			<div className="col-span-4 tracking-tight md:col-span-8 md:text-2xl">
				{title && <h1>{title}</h1>}
				{cta && href && (
					<p>
						<NextLink
							href={href}
							className="text-accent bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat bg-[length:0%_calc(1em/12)] bg-[position:100%_100%] transition-[background-size] hover:bg-[length:100%_calc(1em/12)] hover:bg-[position:0_100%] motion-reduce:transition-none">
							{cta.title || cta.pageName}
						</NextLink>
					</p>
				)}
			</div>
		</Grid>
	);
}
