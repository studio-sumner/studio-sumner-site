import {defineConfig} from 'sanity';
import {deskTool} from 'sanity/desk';
import deskStructure from './src/admin/deskStructure';
import productionUrl from './src/admin/resolveProductionUrl';

import {dashboardTool} from '@sanity/dashboard';
import {vercelWidget} from 'sanity-plugin-dashboard-widget-vercel';
import {visionTool} from '@sanity/vision';
import {noteField} from 'sanity-plugin-note-field';

// ECOMM
import {shopify} from './src/plugins/shopify';

import schemaTypes from './src/schemas/schema';
import {media, mediaAssetSource} from 'sanity-plugin-media';
import {muxInput} from 'sanity-plugin-mux-input';
import {codeInput} from '@sanity/code-input';
import {colorInput} from '@sanity/color-input';
import without from 'lodash/without';
import find from 'lodash/find';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export default defineConfig({
	name: 'sprout',
	title: 'Sprout',
	basePath: '/admin',
	projectId,
	dataset,
	plugins: [
		// ECOMM
		shopify(),

		deskTool({
			structure: deskStructure,
		}),
		media(),
		dashboardTool({
			widgets: [vercelWidget()],
		}),
		visionTool(),

		// Order not needed
		muxInput(),
		codeInput(),
		colorInput(),
		noteField(),
	],
	schema: {
		types: schemaTypes,
	},
	document: {
		productionUrl,
	},
	tools: (prev, context) => {
		const dashboardTool = find(prev, {name: 'dashboard'});
		const toolsWithoutDashboard = without(prev, dashboardTool);

		return [
			...toolsWithoutDashboard,
			{
				...dashboardTool,
				name: 'deploy',
				title: 'Deploy',
			},
		];
	},
	form: {
		image: {
			assetSources: () => [mediaAssetSource],
		},
	},
});
