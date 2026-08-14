import { NANNIES } from './lib/nannies';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://upacare-marketplace.vercel.app';

export default function sitemap() {
  const staticRoutes = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/browse', priority: 0.9, changeFrequency: 'daily' },
    { path: '/for-families', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/for-nannies', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/trust-safety', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/for-business', priority: 0.7, changeFrequency: 'monthly' },
  ].map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const nannyRoutes = NANNIES.map((nanny) => ({
    url: `${siteUrl}/nanny/${nanny.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...nannyRoutes];
}
