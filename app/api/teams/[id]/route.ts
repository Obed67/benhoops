import { NextResponse } from 'next/server';
import { getTeamById } from '@/lib/api/sportsdb';
import { CACHE_HEADERS } from '@/lib/config/api';

export const revalidate = 86400; // 24 heures

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const team = await getTeamById(params.id);

    if (!team) {
      return NextResponse.json({ error: 'Team not found', team: null }, { status: 404 });
    }

    return NextResponse.json(
      { team },
      {
        status: 200,
        headers: CACHE_HEADERS,
      }
    );
  } catch (error) {
    console.error(`API Error - GET /api/teams/${params.id}:`, error);
    return NextResponse.json({ error: 'Failed to fetch team', team: null }, { status: 500 });
  }
}
