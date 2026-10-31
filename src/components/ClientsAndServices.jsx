import React from 'react';
import Grid from './Grid';
import {riseClassName, riseStyle} from '../config/rise';

// Selected clients and services share one row: columns 1–2 and 3–4 on phones, 1–4 and 5–8 from md.
// Each service is a group name with its details on the next line, separated by a blank line.
export default function ClientsAndServices({
	clientsTitle,
	clients = [],
	servicesTitle,
	services = [],
	index = 0,
}) {
	return (
		<Grid
			as="section"
			className={`mt-12 items-start md:mt-16 ${riseClassName}`}
			style={riseStyle(index + 1)}>
			<ul className="col-span-2 md:col-span-4">
				<li className="mb-2 font-bold">{clientsTitle}</li>
				{clients?.map((client, i) => (
					<li key={`${client}-${i}`}>{client}</li>
				))}
			</ul>
			<ul className="col-span-2 md:col-span-4">
				<li className="mb-2 font-bold">{servicesTitle}</li>
				{services?.map(service => (
					<li key={service._key} className="not-last:mb-4">
						{service.name}
						{service.detail && (
							<>
								<br />
								{service.detail}
							</>
						)}
					</li>
				))}
			</ul>
		</Grid>
	);
}
