import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'kuril',

  projectId: '6zjrx5k4',
  dataset: 'production',

  plugins: [
    structureTool({
      structure, // Use our own custome structure that we defined in structure/index.ts
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
