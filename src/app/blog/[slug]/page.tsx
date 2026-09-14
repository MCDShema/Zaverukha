import React from 'react';
import { notFound } from 'next/navigation';
import { ARTICLES } from '@/data/articles';
import ArticleDetailView from '@/components/blog/ArticleDetailView';

export async function generateStaticParams() {
  return ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return <ArticleDetailView initialArticle={article} />;
}
