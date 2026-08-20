import { detailedRepairCases, repairCases } from './config.js';
import { getSortedPostsData } from './markdown.js';
import { SERVICE_PAGES } from './service-pages.js';

export const SITE_URL = 'https://menyixiu.cn';

function latestDate(values, fallback) {
  return values.filter(Boolean).sort((a, b) => String(b).localeCompare(String(a)))[0] || fallback;
}

export function getSiteRoutes() {
  const posts = getSortedPostsData();
  const faqListUpdated = latestDate(
    posts.map((post) => post.updated || post.date),
    '2026-08-04',
  );
  const casesListUpdated = latestDate(
    repairCases.map((repairCase) => repairCase.date),
    '2026-07-26',
  );

  const staticRoutes = [
    {
      path: '/',
      lastModified: '2026-08-20',
      priority: 1,
      changeFrequency: 'weekly',
    },
    {
      path: '/faq',
      lastModified: faqListUpdated,
      priority: 0.8,
      changeFrequency: 'weekly',
    },
    {
      path: '/cases',
      lastModified: casesListUpdated,
      priority: 0.8,
      changeFrequency: 'weekly',
    },
  ];

  const serviceRoutes = SERVICE_PAGES.map((service) => ({
    path: `/services/${service.slug}`,
    lastModified: service.updated,
    priority: 0.8,
    changeFrequency: 'monthly',
  }));

  const faqRoutes = posts.map((post) => ({
    path: `/faq/${post.slug}`,
    lastModified: post.updated || post.date,
    priority: 0.7,
    changeFrequency: 'monthly',
  }));

  const caseRoutes = detailedRepairCases.map((repairCase) => ({
    path: `/cases/${repairCase.slug}`,
    lastModified: repairCase.date,
    priority: 0.7,
    changeFrequency: 'monthly',
  }));

  return [...staticRoutes, ...serviceRoutes, ...faqRoutes, ...caseRoutes];
}

export function getCanonicalUrls() {
  return getSiteRoutes().map((route) => `${SITE_URL}${route.path}`);
}
