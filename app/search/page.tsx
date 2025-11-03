'use client';

import { useState, useMemo } from 'react';
import { teams, players } from '@/data/teams';
import { matches } from '@/data/matches';
import { Input } from '@/components/ui/input';
import { TeamCard } from '@/components/cards/team-card';
import { PlayerCard } from '@/components/cards/player-card';
import { MatchCard } from '@/components/cards/match-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';

export default function SearchPage() {
  const [query, setQuery] = useState('');

  const filteredTeams = useMemo(() => {
    if (!query) return [];
    const lowerQuery = query.toLowerCase();
    return teams.filter(
      (team) =>
        team.name.toLowerCase().includes(lowerQuery) ||
        team.city.toLowerCase().includes(lowerQuery) ||
        team.country.toLowerCase().includes(lowerQuery)
    );
  }, [query]);

  const filteredPlayers = useMemo(() => {
    if (!query) return [];
    const lowerQuery = query.toLowerCase();
    return players.filter(
      (player) =>
        player.name.toLowerCase().includes(lowerQuery) ||
        player.nationality.toLowerCase().includes(lowerQuery) ||
        player.position.toLowerCase().includes(lowerQuery)
    );
  }, [query]);

  const filteredMatches = useMemo(() => {
    if (!query) return [];
    const lowerQuery = query.toLowerCase();
    return matches.filter((match) => {
      const homeTeam = teams.find((t) => t.id === match.homeTeamId);
      const awayTeam = teams.find((t) => t.id === match.awayTeamId);
      return (
        homeTeam?.name.toLowerCase().includes(lowerQuery) ||
        awayTeam?.name.toLowerCase().includes(lowerQuery) ||
        match.venue.toLowerCase().includes(lowerQuery)
      );
    });
  }, [query]);

  const totalResults = filteredTeams.length + filteredPlayers.length + filteredMatches.length;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1
          className="mb-4 text-5xl font-bold md:text-6xl"
          style={{ fontFamily: 'var(--font-bebas)' }}
        >
          Recherche
        </h1>
        <p className="text-xl text-muted-foreground">
          Recherchez des équipes, joueurs et matchs
        </p>
      </div>

      <div className="mx-auto mb-8 max-w-2xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Rechercher..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 text-lg"
          />
        </div>
        {query && (
          <p className="mt-2 text-center text-sm text-muted-foreground">
            {totalResults} {totalResults === 1 ? 'résultat trouvé' : 'résultats trouvés'}
          </p>
        )}
      </div>

      {query ? (
        <Tabs defaultValue="teams" className="w-full">
          <TabsList className="mb-8 grid w-full grid-cols-3 lg:w-[400px] lg:mx-auto">
            <TabsTrigger value="teams">
              Équipes ({filteredTeams.length})
            </TabsTrigger>
            <TabsTrigger value="players">
              Joueurs ({filteredPlayers.length})
            </TabsTrigger>
            <TabsTrigger value="matches">
              Matchs ({filteredMatches.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="teams">
            {filteredTeams.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredTeams.map((team) => (
                  <TeamCard key={team.id} team={team} />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">Aucune équipe trouvée</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="players">
            {filteredPlayers.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredPlayers.map((player) => (
                  <PlayerCard key={player.id} player={player} />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">Aucun joueur trouvé</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="matches">
            {filteredMatches.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredMatches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">Aucun match trouvé</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      ) : (
        <div className="py-12 text-center">
          <Search className="mx-auto mb-4 h-16 w-16 text-muted-foreground/50" />
          <p className="text-muted-foreground">
            Commencez à taper pour rechercher des équipes, joueurs et matchs
          </p>
        </div>
      )}
    </div>
  );
}
