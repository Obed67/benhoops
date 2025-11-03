import { Metadata } from 'next';
import { standings } from '@/data/standings';
import { teams } from '@/data/teams';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Classement - African Basketball League',
  description: 'Consultez le classement complet de la ligue africaine de basketball.',
};

export default function StandingsPage() {
  const sortedStandings = [...standings].sort((a, b) => {
    if (b.winPercentage !== a.winPercentage) {
      return b.winPercentage - a.winPercentage;
    }
    return b.pointsDiff - a.pointsDiff;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1
          className="mb-4 text-5xl font-bold md:text-6xl"
          style={{ fontFamily: 'var(--font-bebas)' }}
        >
          Classement
        </h1>
        <p className="text-xl text-muted-foreground">
          Classement général de la saison en cours
        </p>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">#</TableHead>
              <TableHead>Équipe</TableHead>
              <TableHead className="text-center">J</TableHead>
              <TableHead className="text-center">V</TableHead>
              <TableHead className="text-center">D</TableHead>
              <TableHead className="text-center">% Vict.</TableHead>
              <TableHead className="text-center">Pts M</TableHead>
              <TableHead className="text-center">Pts E</TableHead>
              <TableHead className="text-center">Diff</TableHead>
              <TableHead className="text-center">Série</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedStandings.map((standing, index) => {
              const team = teams.find((t) => t.id === standing.teamId);
              if (!team) return null;

              return (
                <TableRow key={team.id} className="hover:bg-muted/50">
                  <TableCell className="font-semibold">{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{team.logo}</div>
                      <div>
                        <p className="font-semibold">{team.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {team.city}, {team.country}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{standing.played}</TableCell>
                  <TableCell className="text-center font-semibold text-green-600 dark:text-green-400">
                    {standing.won}
                  </TableCell>
                  <TableCell className="text-center text-red-600 dark:text-red-400">
                    {standing.lost}
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    {(standing.winPercentage * 100).toFixed(0)}%
                  </TableCell>
                  <TableCell className="text-center">{standing.pointsFor}</TableCell>
                  <TableCell className="text-center">{standing.pointsAgainst}</TableCell>
                  <TableCell className="text-center">
                    <span
                      className={
                        standing.pointsDiff > 0
                          ? 'text-green-600 dark:text-green-400'
                          : standing.pointsDiff < 0
                            ? 'text-red-600 dark:text-red-400'
                            : ''
                      }
                    >
                      {standing.pointsDiff > 0 ? '+' : ''}
                      {standing.pointsDiff}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={standing.streak.startsWith('W') ? 'default' : 'destructive'}
                    >
                      {standing.streak}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border p-6">
          <h3 className="mb-2 text-lg font-semibold">Légende</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <span className="font-semibold">J</span> - Matchs joués
            </li>
            <li>
              <span className="font-semibold">V</span> - Victoires
            </li>
            <li>
              <span className="font-semibold">D</span> - Défaites
            </li>
            <li>
              <span className="font-semibold">% Vict.</span> - Pourcentage de victoires
            </li>
          </ul>
        </div>

        <div className="rounded-lg border p-6">
          <h3 className="mb-2 text-lg font-semibold">Statistiques</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <span className="font-semibold">Pts M</span> - Points marqués
            </li>
            <li>
              <span className="font-semibold">Pts E</span> - Points encaissés
            </li>
            <li>
              <span className="font-semibold">Diff</span> - Différence de points
            </li>
          </ul>
        </div>

        <div className="rounded-lg border p-6">
          <h3 className="mb-2 text-lg font-semibold">Séries</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Badge variant="default" className="mr-2">
                W
              </Badge>
              Victoires consécutives
            </li>
            <li>
              <Badge variant="destructive" className="mr-2">
                L
              </Badge>
              Défaites consécutives
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
