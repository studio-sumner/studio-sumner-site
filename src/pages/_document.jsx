import React from 'react';
import Analytics from '../components/Analytics';
import {themeScript} from '../components/ThemeToggle';
import Document, {Head, Html, Main, NextScript} from 'next/document';

// This renders the initial page theme via SSR
// It is updated via _app.jsx
export default class ThemeDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<script dangerouslySetInnerHTML={{__html: themeScript}} />
				</Head>
				<body>
					<Main />
					<NextScript />
					<Analytics />
				</body>
			</Html>
		);
	}
}
