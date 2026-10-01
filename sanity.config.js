import {defineConfig} from 'sanity';
import {structureTool} from 'sanity/structure';
import deskStructure from './src/admin/deskStructure';
import productionUrl from './src/admin/resolveProductionUrl';

import {netlifyTool} from 'sanity-plugin-netlify';
import {vercelDeployTool} from 'sanity-plugin-vercel-deploy';
import {visionTool} from '@sanity/vision';
import {noteField} from 'sanity-plugin-note-field';

import schemaTypes from './src/schemas/schema';
import {media, mediaAssetSource} from 'sanity-plugin-media';
import {muxInput} from 'sanity-plugin-mux-input';
import {codeInput} from '@sanity/code-input';
import {colorInput} from '@sanity/color-input';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export default defineConfig({
	name: 'lightswitch',
	title: 'Lightswitch',
	basePath: '/admin',
	projectId,
	dataset,
	plugins: [
		structureTool({structure: deskStructure}),

		media(),
		visionTool(),

		// Order not needed
		muxInput(),
		codeInput(),
		colorInput(),
		noteField(),

		// TODO: Chose your deploy path here
		netlifyTool({title: 'Deploy (Netlify)'}),
		vercelDeployTool({title: 'Deploy (Vercel)'}),
	],
	schema: {
		types: schemaTypes,
	},
	document: {
		productionUrl,
	},
	form: {
		image: {
			assetSources: () => [mediaAssetSource],
		},
	},
});
