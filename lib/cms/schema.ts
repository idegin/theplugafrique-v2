import { z } from "zod";

/** Frontmatter schemas. A build fails loudly if a content file is invalid. */

const isoDate = z.coerce.date();

export const serviceSchema = z.object({
  title: z.string().min(3),
  order: z.number().int(),
  icon: z.string().default("compass"),
  summary: z.string().min(10),
  excerpt: z.string().min(10),
  cover: z.string(),
  coverAlt: z.string().min(3),
  offerings: z.array(z.string()).min(1),
  outcomes: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});

export const postSchema = z.object({
  title: z.string().min(3),
  excerpt: z.string().min(10).max(320),
  date: isoDate,
  updated: isoDate.optional(),
  category: z.string(),
  tags: z.array(z.string()).default([]),
  author: z.string(),
  cover: z.string(),
  coverAlt: z.string().min(3),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
});

export const authorSchema = z.object({
  name: z.string(),
  role: z.string(),
  avatar: z.string(),
  bio: z.string().default(""),
  social: z
    .object({
      linkedin: z.string().url().optional(),
      instagram: z.string().url().optional(),
      x: z.string().url().optional(),
    })
    .default({}),
});

export const testimonialSchema = z.object({
  quote: z.string().min(10),
  name: z.string(),
  role: z.string(),
  organisation: z.string().default(""),
  avatar: z.string().optional(),
  order: z.number().int().default(99),
  /** Placeholder copy that must be replaced with a real client quote before launch. */
  placeholder: z.boolean().default(false),
});

export const faqSchema = z.object({
  question: z.string().min(5),
  order: z.number().int().default(99),
  category: z.string().default("general"),
});

export const clientSchema = z.object({
  name: z.string(),
  logo: z.string(),
  url: z.string().url().optional(),
});
