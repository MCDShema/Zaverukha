import React from 'react';
import { findArticleBySlug, getAllArticleSlugs } from '@/data/articles';
import ArticleDetailView from '@/components/blog/ArticleDetailView';

const RESERVED_SLUGS = new Set([
  'calculator',
  'creativity',
  'privacy-policy',
  'contacts',
  'education',
  'admin',
  'consultation-center',
  'blog',
  'news',
  'satsang-divine-yoga',
  'practices',
  'api',
  'images',
  'wp-content',
  'favicon.ico',
]);

export async function generateStaticParams() {
  const slugs = getAllArticleSlugs();
  return slugs
    .filter((slug) => !RESERVED_SLUGS.has(slug.toLowerCase()))
    .map((slug) => ({ slug }));
}

export default async function LegacyArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = findArticleBySlug(slug);

  return <ArticleDetailView initialArticle={article} slug={slug} />;
}
