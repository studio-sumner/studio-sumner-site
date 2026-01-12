import React, {Fragment} from 'react';
import dynamic from 'next/dynamic';
import PageComponentLoader from './PageComponentLoader';
import reduce from 'lodash/reduce';

const GLOBAL_COMPONENT_LIST_TYPE = 'globalComponentList';

const COMPONENTS = {
	iframeEmbed: dynamic(() => import('./IframeEmbed'), {
		loading: PageComponentLoader,
	}),
	fullWidthHeroCarousel: dynamic(() => import('./FullWidthHeroCarousel'), {
		loading: PageComponentLoader,
	}),
};

const unfurlGlobalComponents = (components = []) =>
	reduce(
		components,
		(componentsWithGlobalsUnfurled, component) => {
			if (component._type === GLOBAL_COMPONENT_LIST_TYPE) {
				const globalComponents = component.components || [];
				return [...componentsWithGlobalsUnfurled, ...globalComponents];
			} else {
				return [...componentsWithGlobalsUnfurled, component];
			}
		},
		[],
	);

export default function PageComponentList({
	components = [],
	componentProps = {},
}) {
	const allComponents = unfurlGlobalComponents(components);

	const componentRows = allComponents.map((component, index) => {
		const Component = COMPONENTS[component._type];

		if (!Component)
			return (
				<div key={component._key} className="p-4 border border-solid">
					missing - {component._type}
				</div>
			);

		return (
			<Component
				index={index}
				key={component._key}
				{...component}
				{...componentProps}
			/>
		);
	});

	return <Fragment>{componentRows}</Fragment>;
}
