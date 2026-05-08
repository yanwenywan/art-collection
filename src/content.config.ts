import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const albums = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/albums" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      cover: image().optional(),
      images: z
        .array(
          z.object({
            file: image(),
            title: z.string().optional(),
            description: z.string().optional(),
          }),
        )
        .optional(),
    }),
});

export const collections = { albums };
