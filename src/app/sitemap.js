import { getSortedPostsData } from '@/lib/markdown';

const SITE_URL = 'https://menyixiu.cn';

export default function sitemap() {
  const lastModified = new Date();

  const staticRoutes = [
    { url: '/', priority: 1.0, changeFrequency: 'weekly' },
    { url: '/faq', priority: 0.8, changeFrequency: 'weekly' },
    { url: '/cases', priority: 0.8, changeFrequency: 'weekly' },
  ];

  const faqRoutes = getSortedPostsData().map((post) => ({
    url: `/faq/${post.slug}`,
    priority: 0.7,
    changeFrequency: 'monthly',
    // post.date 形如 2026-02-08，作为该文章最后更新时间
    lastModified: post.date ? new Date(post.date) : lastModified,
  }));

  return [...staticRoutes, ...faqRoutes].map((route) => ({
    url: `${SITE_URL}${route.url}`,
    lastModified: route.lastModified || lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
