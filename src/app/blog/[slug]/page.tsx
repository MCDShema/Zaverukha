import React from 'react';
import { ARTICLES, findArticleBySlug, getAllArticleSlugs } from '@/data/articles';
import ArticleDetailView from '@/components/blog/ArticleDetailView';

export async function generateStaticParams() {
  const slugs = getAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = findArticleBySlug(slug);

  return <ArticleDetailView initialArticle={article} slug={slug} />;
}
