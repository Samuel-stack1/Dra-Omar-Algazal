import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    // Basic Security: Check Authorization Header or Custom Secret Header
    const authHeader = request.headers.get('authorization');
    const customSecret = request.headers.get('x-soro-secret');
    
    // Check against env variables (you should set SORO_SECRET in .env)
    const validSecret = process.env.SORO_SECRET;
    
    if (validSecret && !((authHeader && authHeader === `Bearer ${validSecret}`) || customSecret === validSecret)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse the JSON payload from Soro
    const body = await request.json();
    
    const { title, slug, content, excerpt, coverImage, publishedAt } = body;

    // Validate minimum requirements
    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    // Generate a simple slug if not provided by the payload
    let finalSlug = slug;
    if (!finalSlug) {
      finalSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }

    // Create the post in the database
    const newPost = await prisma.post.create({
      data: {
        title,
        slug: finalSlug,
        content,
        excerpt: excerpt || null,
        coverImage: coverImage || null,
        publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
      },
    });

    return NextResponse.json(
      { message: 'Post created successfully', post: newPost },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Soro Webhook Error:', error);
    
    // Handle unique constraint violations (e.g., duplicate slug)
    if (error.code === 'P2002') {
       return NextResponse.json({ error: 'A post with this slug already exists' }, { status: 409 });
    }

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
