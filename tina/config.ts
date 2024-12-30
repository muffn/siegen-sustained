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
				label: 'Blog Beiträge',
				path: 'src/content/blog',
				format: 'mdx',
				fields: [
					{
						type: 'image',
						label: 'Titelbild',
						required: true,
						name: 'heroImage',
						description: 'Das Titelbild des Beitrags'
					},
					{
						type: 'string',
						required: true,
						name: 'category',
						label: 'Kategorie',
						description: 'Die Kategorie für diesen Beitrag',
						options: [...CATEGORIES]
					},
					{
						type: 'string',
						label: 'Beschreibung',
						required: true,
						name: 'description',
						description:
							'Eine kurze Beschreibung des Beitrags. Wird auf der Übersichtsseite angezeigt'
					},
					{
						type: 'datetime',
						name: 'pubDate',
						label: 'Veröffentlichungsdatum',
						required: true
					},
					{
						name: 'draft',
						label: 'Entwurf',
						type: 'boolean',
						description: 'Wenn dies aktiviert ist, wird der Beitrag nicht veröffentlicht'
					},
					{
						type: 'string',
						name: 'tags',
						required: true, //does not work see https://github.com/tinacms/tinacms/issues/5220
						label: 'Tags',
						description: 'Tags für diesen Beitrag. Damit lassen sich ähnliche Beiträge finden',
						list: true,
						ui: {
							component: 'tags',
							validate: (value) => {
								if (!value || value.length === 0) {
									return 'Mindestens ein Tag ist erforderlich'
								}
							}
						}
					},
					{
						type: 'string',
						name: 'title',
						label: 'Titel',
						isTitle: true,
						required: true
					},
					{
						type: 'rich-text',
						label: 'Inhalt',
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
						label: 'Bildergalerie',
						name: 'galleryImages',
						list: true,
						description: 'Bilder, die in einer Galerie am Ende des Beitrags angezeigt werden'
					}
				]
			},
			{
				name: 'page',
				label: 'Seiten',
				path: 'src/content/page',
				format: 'mdx',
				ui: {
					allowedActions: {
						create: false,
						delete: false
					}
				},
				fields: [
					{
						type: 'string',
						name: 'title',
						label: 'Titel',
						isTitle: true,
						required: true
					},
					{
						type: 'rich-text',
						label: 'Inhalt',
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
					}
				]
			}
		]
	}
})
