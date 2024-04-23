import React from 'react';
import {defaultSerializers} from '@sanity/block-content-to-react';
import MarkLink from '../components/MarkLink';
import BlockTable from '../components/BlockTable';
import BlockImage from '../components/BlockImage';

export default {
	types: {
		block: props => {
			const {style = 'normal'} = props.node;

			if (style === 'h1') {
				return <h1>{props.children}</h1>;
			} else if (style === 'h2') {
				return <h2>{props.children}</h2>;
			} else if (style === 'h3') {
				return <h3>{props.children}</h3>;
			} else if (style === 'h4') {
				return <h4>{props.children}</h4>;
			} else if (style === 'h5') {
				return <h5>{props.children}</h5>;
			} else if (style === 'h6') {
				return <h6>{props.children}</h6>;
			} else if (style === 'monospace') {
				return <p className="mono">{props.children}</p>;
			}

			// Fall back to default handling
			return defaultSerializers.types.block(props);
		},
		table: BlockTable,
		image: BlockImage,
	},
	marks: {
		link: MarkLink,
	},
};
