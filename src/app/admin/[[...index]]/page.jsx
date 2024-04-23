import React from 'react';
import AdminStudio from '../../../components/AdminStudio';

// Ensures the Studio route is statically generated
export const dynamic = 'force-static';

// Set the right `viewport`, `robots` and `referer` meta tags
export {metadata, viewport} from 'next-sanity/studio';

export default function StudioPage() {
	return <AdminStudio />;
}
