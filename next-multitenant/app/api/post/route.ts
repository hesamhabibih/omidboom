import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const subdomain = request.nextUrl.searchParams.get('subdomain');

  if (!subdomain) {
    console.warn('API: Subdomain is required');
    return NextResponse.json({ error: 'Subdomain is required' }, { status: 400 });
  }

  try {
    console.info('API: Fetching tenant with subdomain:', subdomain);


    const post = await prisma.posts.findFirst({
      where: {
      },
      select: {
        id: true,
        name: true,
        content: true
      }
    });
    

    if (!post) {
      console.info('API: Tenant not found for subdomain:', subdomain);
      return NextResponse.json({ error: 'Tenant not found' }, { status: 404 });
    }

    console.info('API: Tenant found:', post);
    return NextResponse.json(post);
  } catch (error) {
    console.error('API: Error fetching tenant:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
