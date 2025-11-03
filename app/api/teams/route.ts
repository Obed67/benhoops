import { NextResponse } from 'next/server';
import { getBALTeams } from '@/lib/api/sportsdb';
import { CACHE_HEADERS } from '@/lib/config/api';

export const revalidate = 86400; // 24 heures - ISR

export async function GET() {
  try {
    const teams = await getBALTeams();

    return NextResponse.json(
      { teams, count: teams.length },
      {
        status: 200,
        headers: CACHE_HEADERS,
      }
    );
  } catch (error) {
    console.error('API Error - GET /api/teams:', error);
    return NextResponse.json(
      { error: 'Failed to fetch teams', teams: [], count: 0 },
      { status: 500 }
    );
  }
}
