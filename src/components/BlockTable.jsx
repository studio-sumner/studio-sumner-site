import React from 'react';
import classNames from 'classnames';

export default function BlockTable({node = {}}) {
	const {headers = [], rows = []} = node;

	return (
		<div className="overflow-x-auto scroll-touch pt-[1px] pb-[1px]">
			<table>
				<thead>
					<tr>
						{headers.map((h, index) => (
							<th
								key={index}
								colSpan={h.colspan || 1}
								className={classNames('whitespace-nowrap', {
									'text-left': h.textalign == 'left',
									'text-center': h.textalign == 'center',
									'text-right': h.textalign == 'right',
								})}>
								{h.title}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows.map((r, index) => (
						<tr key={index}>
							{r.columns.map((c, index) => (
								<td
									key={index}
									colSpan={c.colspan || 1}
									className={classNames('whitespace-nowrap', {
										'text-left': c.textalign == 'left',
										'text-center': c.textalign == 'center',
										'text-right': c.textalign == 'right',
									})}>
									{c.text}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
