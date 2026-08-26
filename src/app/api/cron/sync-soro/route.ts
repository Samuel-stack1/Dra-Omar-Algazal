import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import Parser from 'rss-parser';

export async function GET(request: Request) {
  try {
    // Basic Security: Check secret in URL search params
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    
    const validSecret = process.env.SORO_SECRET;
    
    if (validSecret && secret !== validSecret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Initialize RSS Parser
    const parser = new Parser({
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/rss+xml, application/xml, text/xml; q=0.1',
      },
      customFields: {
        item: ['excerpt', 'coverImage', 'content:encoded', 'content'],
      }
    });

    const RSS_URL = 'https://app.trysoro.com/api/rss/79dec606-4adc-4f26-8b67-b74e0b05e2b5';
    const feed = await parser.parseURL(RSS_URL);

    let newPostsCount = 0;

    // Loop through RSS items from oldest to newest (to preserve chronological order)
    const items = [...feed.items].reverse();

    for (const item of items) {
      const title = item.title;
      // Use standard content if available, fallback to custom fields or description
      const content = item['content:encoded'] || item.content || item.contentSnippet || '';
      const excerpt = item.excerpt || item.description || item.contentSnippet?.substring(0, 150) + '...' || null;
      const coverImage = item.coverImage || item.enclosure?.url || null;
      const publishedAt = item.pubDate ? new Date(item.pubDate) : new Date();

      if (!title || !content) {
        continue;
      }

      // Generate a simple slug
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

      // Check if post already exists
      const existingPost = await prisma.post.findUnique({
        where: { slug }
      });

      if (!existingPost) {
        await prisma.post.create({
          data: {
            title,
            slug,
            content,
            excerpt,
            coverImage,
            publishedAt,
          }
        });
        newPostsCount++;
      }
    }

    return NextResponse.json(
      { message: 'Sync complete', newPostsAdded: newPostsCount },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Soro RSS Sync Error:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}
