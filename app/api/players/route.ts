import { NextResponse } from 'next/server';
import { fetchAllPlayers } from '@/lib/api/server';
import { CACHE_HEADERS } from '@/lib/config/api';

export const revalidate = 43200; // 12 heures - ISR

export async function GET() {
  try {
    const players = await fetchAllPlayers();

    return NextResponse.json(
      { players, count: players.length },
      {
        status: 200,
        headers: CACHE_HEADERS,
      }
    );
  } catch (error) {
    console.error('API Error - GET /api/players:', error);
    return NextResponse.json(
      { error: 'Failed to fetch players', players: [], count: 0 },
      { status: 500 }
    );
  }
}
