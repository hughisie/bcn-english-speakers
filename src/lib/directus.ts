import { createDirectus, rest, graphql } from '@directus/sdk';
import { HEADLESS_STUB } from '../consts';

export type HeadlessGlobal = {
  id: number;
  title: string;
  description: string;
}

export type HeadlessAuthor = {
  id: number;
  /** Formatted, like: Bob */
  name: string;
  /** File UUID */
  avatar: string | null;
}

export type HeadlessPage = {
  /** The page slug ID used for the unique URL */
  slug: string;
  title: string;
  content: string;
}

export type HeadlessPost = {
  /** The post slug ID used for the unique URL */
  slug: string;
  status: PostStatus;
  author: HeadlessAuthor; // TODO
  title: string;
  /** The post HTML */
  content: string;
  snippet: string;
  /** Image UUID */
  cover: string;
  category: PostCategory;
  tags: string[];
  published_date: string;
  user_created: string;
  user_updated: string | null;
  date_created: string;
  date_updated: string | null;
  // hide_post?: boolean;
  // related_post?: string;
}

type PostStatus = 'draft' | 'published' | 'archived';
type PostCategory = 'News' | 'Going Out' | 'Gastro' | 'Getting Around' | 'Guides';


export type HeadlessGroup = {
  /** The group ID used for the unique URL */
  id: string;
  icon: string;
  link: string;
  name: string;
  slug: string;
  description: string;
}

type HeadlessSchema = {
  authors: HeadlessAuthor[];
  posts: HeadlessPost[];
  global: HeadlessGlobal;
  pages: HeadlessPage[];
  groups: HeadlessGroup[];
}

/** Convert a Directus file/image asset UUID to a full URL */
export function convertAssetIdToUrl(assetId: string): string {
  return `${HEADLESS_STUB}/assets/${assetId}` // Astro needs the full URL for Directus image assets
}


const directus = createDirectus<HeadlessSchema>(`${HEADLESS_STUB}/`).with(rest());

export default directus;
