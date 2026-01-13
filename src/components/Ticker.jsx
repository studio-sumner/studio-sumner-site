import React from 'react';
import Marqy from './Marqy';
import {PortableText} from '@portabletext/react';
import richText from '../serializers/richText';

const Ticker = ({description = []}) => (
	<div className="my-2 md:my-6 overflow-hidden py-2">
		<div className="-mx-1">
			<div className="rotate-1">
				<Marqy
					speed={0.5}
					pauseOnHover
					className="pt-[27px] pb-2 bg-green">
					<div className="whitespace-nowrap pr-1">
						{description?.length > 0 && (
							<div className="rich-text text-36/48 uppercase tracking-tight">
								<PortableText
									value={description}
									components={richText}
								/>
							</div>
						)}
					</div>
				</Marqy>
			</div>
		</div>
	</div>
);

export default Ticker;
