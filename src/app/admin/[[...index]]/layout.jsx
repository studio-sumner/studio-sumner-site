import '../../../styles/global/reset.css';

import React from 'react';

export default function RootLayout({children}) {
	return (
		<html>
			<body>{children}</body>
		</html>
	);
}
