import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '../config/site';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog');
  return rss({
    title: site.name,
    description: site.description,
    site: context.site!,
    items: posts
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        link: `/${site.contentPrefix}/${post.slug}/`,
      })),
    customData: '<language>ja</language>',
  });
}
