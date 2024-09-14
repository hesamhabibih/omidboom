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

    // const tenant = await prisma.tenant.findUnique({
    //   where: { subdomain },
    //   select: { id: true, name: true, subdomain: true },
    // });

    const tenant = await prisma.tenant.findFirst({
      where: {
        subdomain,
      },
      select: {
        id: true,
        name: true,
        subdomain: true
      }
    });
    

    if (!tenant) {
      console.info('API: Tenant not found for subdomain:', subdomain);
      return NextResponse.json({ error: 'Tenant not found' }, { status: 404 });
    }

    console.info('API: Tenant found:', tenant);
    return NextResponse.json(tenant);
  } catch (error) {
    console.error('API: Error fetching tenant:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
