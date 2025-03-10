import { CATEGORIES } from '@/data/categories.ts'
import { defineConfig } from 'tinacms'
import { PERSON_PAGES } from '@/data/person-pages.ts'

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || 'main'

export default defineConfig({
	build: {
		outputFolder: 'admin',
		publicFolder: 'public'
	},
	media: {
		tina: {
			mediaRoot: '/public/images',
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
						required: true,
						ui: {
							utc: true
						}
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
						name: 'ImageEmbed',
						isBody: true,
						toolbarOverride: [
							'heading',
							'link',
							'quote',
							'ul',
							'ol',
							'bold',
							'italic',
							'table',
							'raw',
							'embed'
						],
						templates: [
							{
								name: 'ImageEmbed',
								label: 'Eingebettetes Bild',
								fields: [
									{
										name: 'image',
										label: 'Bild',
										type: 'image',
										required: true
									},
									{
										name: 'alt',
										label: 'Beschreibungstext',
										description:
											'Beschreibt das Bild für Bildschirmleser und falls es nicht geladen werden kann',
										type: 'string',
										required: true
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
						name: 'ImageEmbed',
						isBody: true,
						toolbarOverride: [
							'heading',
							'link',
							'quote',
							'ul',
							'ol',
							'bold',
							'italic',
							'table',
							'raw',
							'embed'
						],
						templates: [
							{
								name: 'ImageEmbed',
								label: 'Eingebettetes Bild',
								fields: [
									{
										name: 'image',
										label: 'Bild',
										type: 'image',
										required: true
									},
									{
										name: 'alt',
										label: 'Beschreibungstext',
										description:
											'Beschreibt das Bild für Bildschirmleser und falls es nicht geladen werden kann',
										type: 'string',
										required: true
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
						description: 'Bilder, die in einer Galerie am Ende der Seite angezeigt werden'
					}
				]
			},
			{
				name: 'person',
				label: 'Personen',
				path: 'src/content/person',
				format: 'mdx',
				fields: [
					{
						type: 'image',
						label: 'Profilbild',
						name: 'profileImage',
						description: 'Das Profilbild der Person',
						required: true
					},
					{
						type: 'string',
						name: 'name',
						label: 'Name',
						description: 'Der Name der Person',
						required: true
					},
					{
						type: 'string',
						name: 'description',
						label: 'Beschreibung',
						description: 'Eine kurze Beschreibung der Person',
						required: true
					},
					{
						type: 'string',
						required: true,
						name: 'category',
						label: 'Kategorie',
						description: 'In welchen Bereichen soll die Person angezeigt werden?',
						list: true,
						options: [...PERSON_PAGES]
					}
				]
			}
		]
	}
})
