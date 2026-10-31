import React from 'react';
import Grid from './Grid';
import SimpleText from './SimpleText';
import {riseClassName, riseStyle} from '../config/rise';

export default function Details({items = [], index = 0}) {
	return (
		<Grid
			as="section"
			className={`mt-12 gap-y-6 md:mt-16 ${riseClassName}`}
			style={riseStyle(index + 1)}>
			{items?.map(item => (
				<div key={item._key} className="col-span-4">
					<p className="font-bold">{item.title}</p>
					<div className="text-balance md:text-wrap">
						<SimpleText value={item.text} />
					</div>
				</div>
			))}
		</Grid>
	);
}
