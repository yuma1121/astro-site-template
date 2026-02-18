import { defineCollection, z } from 'astro:content';
import { site } from '../config/site';

const categorySlugs = site.categories.map((c) => c.slug) as [string, ...string[]];

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(categorySlugs),
    tags: z.array(z.string()),
    affiliateLinks: z
      .array(
        z.object({
          name: z.string(),
          url: z.string().url(),
          cta: z.string(),
          image: z.string().optional(),
          catchphrase: z.string().optional(),
          description: z.string().optional(),
        }),
      )
      .optional(),
    heroImage: z.string().optional(),
    points: z.array(z.string()).optional(),
    faq: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        }),
      )
      .optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};
