import React from 'react';
import Layout from './Layout';

const ROUTE_LAYOUTS = {
	Layout,
};

const AppLayout = ({layout, children, ...props}) => {
	const Layout = ROUTE_LAYOUTS[layout];

	if (!Layout) return children;

	return <Layout {...props}>{children}</Layout>;
};

export default AppLayout;
