import { defineCollection, type ImageFunction, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const seoSchemaWithoutImage = z.object({
  title: z.string(),
  description: z.string(),
  type: z.string().optional(),
  keywords: z.string().optional(),
  canonicalUrl: z.string().optional(),
  twitter: z
    .object({
      creator: z.string().optional(),
    })
    .optional(),
  robots: z.string().optional(),
});

const seoSchema = (image: ImageFunction) =>
  z
    .object({
      image: image().optional(),
    })
    .merge(seoSchemaWithoutImage);

const pageCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/pages' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      seo: seoSchema(image),
    }),
});

const linkCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.yml', base: './src/content/links' }),
  schema: z.object({
    label: z.string(),
    name: z.string(),
    url: z.string(),
  }),
});

const projectCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      company: z.string().optional(),
      location: z.string().optional(),
      from: z.number().optional(),
      to: z.number().optional(), // optional if currently working
      url: z.string().optional(),
      images: z.array(image()).optional(),
      order: z.number().optional(),
    }),
});

const postCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.date(),
      image: image().optional(),
      seo: seoSchema(image),
    }),
});

const productCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/products' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      price: z.number(),
      currency: z.string().default('$'),
      description: z.string(),
      image: image().optional(),
      available: z.boolean().default(true),
    }),
});

const otherStuffCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/other-stuff' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      url: z.string().optional(),
      order: z.number().optional(),
    }),
});

export const collections = {
  pages: pageCollection,
  links: linkCollection,
  projects: projectCollection,
  posts: postCollection,
  products: productCollection,
  otherStuff: otherStuffCollection,
};
