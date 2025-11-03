import { NextResponse } from 'next/server';
import { calculateStandings } from '@/lib/api/server';
import { CACHE_HEADERS } from '@/lib/config/api';

export const revalidate = 3600; // 1 heure - ISR

export async function GET() {
  try {
    const standings = await calculateStandings();

    return NextResponse.json(
      { standings, count: standings.length },
      {
        status: 200,
        headers: CACHE_HEADERS,
      }
    );
  } catch (error) {
    console.error('API Error - GET /api/standings:', error);
    return NextResponse.json(
      { error: 'Failed to calculate standings', standings: [], count: 0 },
      { status: 500 }
    );
  }
}
