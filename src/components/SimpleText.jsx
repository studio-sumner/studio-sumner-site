import React from 'react';
import {PortableText} from '@portabletext/react';
import TextLink from './TextLink';

const components = {
	block: {
		normal: ({children}) => <p>{children}</p>,
	},
	marks: {
		link: ({value = {}, children}) => (
			<TextLink href={value.href} openInNewWindow={value.openInNewWindow}>
				{children}
			</TextLink>
		),
	},
};

// Renders Simple Text fields: paragraphs, links and line breaks.
export default function SimpleText({value = []}) {
	return <PortableText value={value} components={components} />;
}
