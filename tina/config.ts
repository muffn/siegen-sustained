import { CATEGORIES } from '../src/data/categories.ts'
import { defineConfig } from 'tinacms'

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || 'main'

export default defineConfig({
	build: {
		outputFolder: 'admin',
		publicFolder: 'public'
	},
	media: {
		tina: {
			mediaRoot: '/src/assets/images',
			publicFolder: ''
		}
	},
	token: process.env.TINA_TOKEN,
	clientId: process.env.TINA_PUBLIC_CLIENT_ID,
	branch,
	search: {
		tina: {
			indexerToken: process.env.TINA_SEARCH_TOKEN,
			stopwordLanguages: ['deu', 'eng']
		},
		indexBatchSize: 100,
		maxSearchIndexFieldLength: 100
	},
	schema: {
		collections: [
			{
				name: 'post',
				label: 'Blog Post',
				path: 'src/content/blog',
				format: 'mdx',
				fields: [
					{
						type: 'image',
						label: 'Cover Image',
						required: true,
						name: 'heroImage',
						description: 'The image used for the cover of the post'
					},
					{
						type: 'string',
						required: true,
						name: 'category',
						label: 'Category',
						description: 'Select an category for this post',
						options: [...CATEGORIES]
					},
					{
						type: 'string',
						label: 'description',
						required: true,
						name: 'description',
						description: 'A short description of the post'
					},
					{
						type: 'datetime',
						name: 'pubDate',
						label: 'Publication Date',
						required: true
					},
					{
						name: 'draft',
						label: 'Draft',
						type: 'boolean',
						description: 'If this is checked the post will not be published'
					},
					{
						type: 'string',
						name: 'tags',
						required: true, //does not work see https://github.com/tinacms/tinacms/issues/5220
						label: 'Tags',
						description: 'Tags for this post',
						list: true,
						ui: {
							component: 'tags',
							validate: (value) => {
								if (!value || value.length === 0) {
									return 'At least one tag is required'
								}
							}
						}
					},
					{
						type: 'string',
						name: 'title',
						label: 'Title',
						isTitle: true,
						required: true
					},
					{
						type: 'rich-text',
						label: 'Body',
						name: 'SButton',
						isBody: true,
						templates: [
							// Custom Components
							{
								label: 'SButton',
								name: 'SButton',
								fields: [
									{
										type: 'rich-text',
										label: 'SButton',
										name: 'children',
										isBody: true
									}
								]
							}
						]
					},
					{
						type: 'image',
						label: 'Gallery Images',
						name: 'galleryImages',
						list: true,
						description: 'The images used in the end of the post'
					}
				]
			}
		]
	}
})
