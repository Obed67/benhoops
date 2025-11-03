import { NextResponse } from 'next/server';
import { fetchAllMatches } from '@/lib/api/server';
import { CACHE_HEADERS } from '@/lib/config/api';

export const revalidate = 3600; // 1 heure - ISR

export async function GET() {
  try {
    const matches = await fetchAllMatches();

    return NextResponse.json(
      { matches, count: matches.length },
      {
        status: 200,
        headers: CACHE_HEADERS,
      }
    );
  } catch (error) {
    console.error('API Error - GET /api/matches:', error);
    return NextResponse.json(
      { error: 'Failed to fetch matches', matches: [], count: 0 },
      { status: 500 }
    );
  }
}
