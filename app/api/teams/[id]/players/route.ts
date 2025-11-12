import { NextRequest, NextResponse } from 'next/server';
import { getPlayersByTeam } from '@/lib/api/sportsdb';

// Utiliser Node.js runtime au lieu de Edge pour de meilleures compatibilités API
export const dynamic = 'force-dynamic'; // Toujours fetch les dernières données
export const revalidate = 0; // Pas de cache ISR, on gère le cache avec Headers

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    console.log(`[API] Fetching players for team ${id}`);

    const players = await getPlayersByTeam(id);

    console.log(`[API] Successfully fetched ${players.length} players for team ${id}`);

    return NextResponse.json(
      {
        players,
        count: players.length,
        teamId: id,
        success: true,
      },
      {
        status: 200,
        headers: {
          // Cache côté client pour 12 heures
          'Cache-Control': 'public, s-maxage=43200, stale-while-revalidate=86400',
        },
      }
    );
  } catch (error) {
    console.error('[API] Error fetching players:', error);

    // Retourner un tableau vide au lieu d'une erreur pour éviter de casser l'UI
    return NextResponse.json(
      {
        players: [],
        count: 0,
        error: 'Failed to fetch players',
        success: false,
      },
      {
        status: 200, // 200 au lieu de 500 pour ne pas casser l'UI côté client
        headers: {
          'Cache-Control': 'no-store', // Ne pas cacher les erreurs
        },
      }
    );
  }
}
