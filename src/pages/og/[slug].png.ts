import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import satori from 'satori';
import sharp from 'sharp';
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { site, categoryLabels } from '../../config/site';

// Font cache: download once per build, reuse
const FONT_CACHE = join(process.cwd(), '.cache', 'fonts', 'NotoSansJP-Bold.otf');
const FONT_URL =
  'https://raw.githubusercontent.com/googlefonts/noto-cjk/main/Sans/SubsetOTF/JP/NotoSansJP-Bold.otf';

async function loadFont(): Promise<Buffer> {
  if (existsSync(FONT_CACHE)) {
    return readFileSync(FONT_CACHE);
  }

  console.log('[og] Downloading Noto Sans JP font...');
  const response = await fetch(FONT_URL);
  if (!response.ok) {
    throw new Error(`Failed to download font: ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  mkdirSync(dirname(FONT_CACHE), { recursive: true });
  writeFileSync(FONT_CACHE, buffer);
  console.log('[og] Font cached at', FONT_CACHE);

  return buffer;
}

const fontData = await loadFont();

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: {
      title: post.data.title,
      category: post.data.category,
    },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const { title, category } = props as { title: string; category: string };
  const categoryLabel = categoryLabels[category] || category;
  const fontSize = title.length > 28 ? 42 : 50;

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#ffffff',
          padding: '0',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                height: '6px',
                backgroundColor: '#2563eb',
                width: '100%',
              },
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                flex: '1',
                padding: '50px 70px 40px',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      marginBottom: '24px',
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: {
                            backgroundColor: '#2563eb',
                            color: '#ffffff',
                            fontSize: '18px',
                            fontWeight: 700,
                            padding: '6px 20px',
                            borderRadius: '4px',
                          },
                          children: categoryLabel,
                        },
                      },
                    ],
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: `${fontSize}px`,
                      fontWeight: 700,
                      color: '#111827',
                      lineHeight: 1.35,
                      flex: '1',
                      display: 'flex',
                      alignItems: 'center',
                    },
                    children: title,
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderTop: '2px solid #e5e7eb',
                      paddingTop: '20px',
                      marginTop: '16px',
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontSize: '22px',
                            fontWeight: 700,
                            color: '#6b7280',
                          },
                          children: site.name,
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Noto Sans JP',
          data: fontData,
          weight: 700,
          style: 'normal' as const,
        },
      ],
    },
  );

  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(new Uint8Array(pngBuffer), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
