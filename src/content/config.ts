import { defineCollection, z } from 'astro:content'
import { CATEGORIES } from '../data/categories'

const blog = defineCollection({
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string().max(80),
			description: z.string(),
			// Transform string to Date object
			pubDate: z
				.string()
				.or(z.date())
				.transform((val) => new Date(val)),
			heroImage: image(),
			category: z.enum(CATEGORIES),
			galleryImages: z.array(image()).optional(),
			tags: z.array(z.string()),
			draft: z.boolean().default(false)
		})
})

const page = defineCollection({
	schema: ({ image }) =>
		z.object({
			title: z.string().max(80),
			id: z.string().max(80),
			galleryImages: z.array(image()).optional()
		})
})

export const collections = { blog, page }
