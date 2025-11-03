import { NextResponse } from 'next/server';
import { getTeamMatches } from '@/lib/api/sportsdb';
import { CACHE_HEADERS } from '@/lib/config/api';

export const revalidate = 3600; // 1 heure

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { searchParams } = new URL(request.url);
    const season = searchParams.get('season') || undefined;

    const matches = await getTeamMatches(params.id, season);

    return NextResponse.json(
      { matches, count: matches.length },
      {
        status: 200,
        headers: CACHE_HEADERS,
      }
    );
  } catch (error) {
    console.error(`API Error - GET /api/teams/${params.id}/matches:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch matches', matches: [], count: 0 },
      { status: 500 }
    );
  }
}
