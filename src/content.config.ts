import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const albums = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/albums' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    // TODO: change to image() once real cover images are added
    cover: z.string().optional(),
    // editorial row groupings for the justified gallery layout (Ticket 5)
    rows: z.array(z.array(z.string())).optional(),
  }),
});

export const collections = { albums };
