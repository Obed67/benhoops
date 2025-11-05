import { NextResponse } from 'next/server';
import { getMatchById } from '@/lib/api/sportsdb';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const match = await getMatchById(params.id);

    if (!match) {
      return NextResponse.json({ error: 'Match not found' }, { status: 404 });
    }

    return NextResponse.json(match, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('Error fetching match:', error);
    return NextResponse.json({ error: 'Failed to fetch match' }, { status: 500 });
  }
}
