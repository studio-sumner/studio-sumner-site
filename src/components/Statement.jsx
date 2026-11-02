import React from 'react';
import Grid from './Grid';
import SimpleText from './SimpleText';
import {riseClassName, riseStyle} from '../config/rise';

export default function Statement({text = [], index = 0}) {
	return (
		<Grid
			as="section"
			className={`mt-24 ${riseClassName}`}
			style={riseStyle(index + 1)}>
			<div className="col-span-4 tracking-tight md:col-span-8 md:text-2xl lg:col-span-12 lg:text-4xl">
				<SimpleText value={text} />
			</div>
		</Grid>
	);
}
