import { getAllNBAMatches } from '@/lib/api/sportsdb';
import { LiveMatchCard } from '@/components/live/live-match-card';
import { Card, CardContent } from '@/components/ui/card';
import { Radio, Calendar, Clock } from 'lucide-react';
import { AnimatedSection, AnimatedGrid } from '@/components/animated-components';

// Pas de cache, données en temps réel
export const revalidate = 0;

export const metadata = {
  title: 'Matchs en Direct - BenHoops',
  description: 'Suivez les matchs NBA en direct avec scores mis à jour en temps réel',
};

export default async function LivePage() {
  const matches = await getAllNBAMatches();

  // Séparer les matchs par statut
  const liveMatches = matches.filter((m) => m.status === 'live');
  const upcomingMatches = matches
    .filter((m) => m.status === 'scheduled')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);
  const recentFinished = matches
    .filter((m) => m.status === 'finished')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <AnimatedSection animation="scale" delay={0.1}>
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg animate-pulse">
              <Radio className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-red-600 via-orange-600 to-red-600 dark:from-red-500 dark:via-orange-500 dark:to-red-500 bg-clip-text text-transparent">
                Matchs en Direct
              </h1>
              <p className="text-muted-foreground">
                Scores NBA mis à jour automatiquement toutes les 30 secondes
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Live Matches */}
      {liveMatches.length > 0 ? (
        <AnimatedSection animation="fadeUp" delay={0.3}>
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-3 w-3 rounded-full bg-red-600 animate-pulse" />
              <h2 className="text-2xl font-bold">En Direct Maintenant ({liveMatches.length})</h2>
            </div>
            <AnimatedGrid
              variant="flip"
              stagger={0.1}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {liveMatches.map((match) => (
                <LiveMatchCard key={match.id} match={match} autoRefresh={true} />
              ))}
            </AnimatedGrid>
          </div>
        </AnimatedSection>
      ) : (
        <AnimatedSection animation="fadeUp" delay={0.3}>
          <Card className="mb-12">
            <CardContent className="py-12 text-center">
              <Radio className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-xl font-semibold mb-2">Aucun match en direct</h3>
              <p className="text-muted-foreground">
                Revenez plus tard pour suivre les matchs NBA en temps réel
              </p>
            </CardContent>
          </Card>
        </AnimatedSection>
      )}

      {/* Upcoming Matches */}
      {upcomingMatches.length > 0 && (
        <AnimatedSection animation="fadeLeft" delay={0.4}>
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-bold">Prochains Matchs</h2>
            </div>
            <AnimatedGrid
              variant="cascade"
              stagger={0.08}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {upcomingMatches.map((match) => (
                <LiveMatchCard key={match.id} match={match} />
              ))}
            </AnimatedGrid>
          </div>
        </AnimatedSection>
      )}

      {/* Recent Finished */}
      {recentFinished.length > 0 && (
        <AnimatedSection animation="fadeRight" delay={0.5}>
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Clock className="h-6 w-6 text-green-600" />
              <h2 className="text-2xl font-bold">Matchs Récents</h2>
            </div>
            <AnimatedGrid
              variant="zoom"
              stagger={0.1}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {recentFinished.map((match) => (
                <LiveMatchCard key={match.id} match={match} />
              ))}
            </AnimatedGrid>
          </div>
        </AnimatedSection>
      )}
    </div>
  );
}
