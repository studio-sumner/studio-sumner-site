import React from 'react';

import {Marqy as MarqyComponent} from 'marqy';
import '../../node_modules/marqy/styles.css';

export default function Marqy({children, speed = 0.2, ...props}) {
	return (
		<MarqyComponent {...props} speed={speed}>
			{children}
		</MarqyComponent>
	);
}
