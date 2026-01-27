import type { z } from 'astro/zod';
import MetaDefaultImage from '@/assets/images/meta-default.jpg';
import avatar from '@/assets/images/avatar.png';
import type { seoSchemaWithoutImage } from '@/content.config';
import astroConfig from 'astro.config.mjs';

export type AuthorInfo = {
  name: string;
  avatar: any;
  headline: string;
  username?: string;
  location?: string;
  pronouns?: string;
};

export type Seo = z.infer<typeof seoSchemaWithoutImage> & {
  image?: any;
};

type DefaultConfigurationType = {
  baseUrl: string;
  author: AuthorInfo;
  seo: Seo;
};

export const DEFAULT_CONFIGURATION: DefaultConfigurationType = {
  baseUrl: astroConfig.site || 'https://babystm.github.io/astro-blog',
  author: {
    avatar,
    name: 'Guitar',
    headline: 'Solopreneur',
    username: 'babystm',
    location: 'Phuket, Thailand',
    pronouns: 'He/Him',
  },
  seo: {
    title: 'Guitar — Dead Simple Productivity',
    description:
      'Solopreneur in Phuket sharing experiences, mindset, and tools for building an online business and digital nomad lifestyle',
    type: 'website',
    image: MetaDefaultImage,
    twitter: {
      creator: '@babystm',
    },
    robots: 'index, follow',
  },
};
