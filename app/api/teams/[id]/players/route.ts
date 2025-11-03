import { NextResponse } from 'next/server';
import { getPlayersByTeam } from '@/lib/api/sportsdb';
import { CACHE_HEADERS } from '@/lib/config/api';

export const revalidate = 43200; // 12 heures

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const players = await getPlayersByTeam(params.id);

    return NextResponse.json(
      { players, count: players.length },
      {
        status: 200,
        headers: CACHE_HEADERS,
      }
    );
  } catch (error) {
    console.error(`API Error - GET /api/teams/${params.id}/players:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch players', players: [], count: 0 },
      { status: 500 }
    );
  }
}
