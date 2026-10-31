import React, {Fragment} from 'react';
import reduce from 'lodash/reduce';
import Statement from './Statement';
import ClientsAndServices from './ClientsAndServices';
import Details from './Details';

const GLOBAL_COMPONENT_LIST_TYPE = 'globalComponentList';

const COMPONENTS = {
	statement: Statement,
	clientsAndServices: ClientsAndServices,
	details: Details,
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

// Page components sit between the header and footer; the footer's place in the load stagger follows them.
export const countComponents = (components = []) =>
	unfurlGlobalComponents(components).length;

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
