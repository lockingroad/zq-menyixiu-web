import { getSiteRoutes, SITE_URL } from '@/lib/site-routes';

export default function sitemap() {
  return getSiteRoutes().map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(`${route.lastModified}T00:00:00.000Z`),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
