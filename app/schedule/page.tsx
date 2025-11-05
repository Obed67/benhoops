import { Metadata } from 'next';
import { getAllNBAMatches } from '@/lib/api/sportsdb';
import { MatchesGrid } from '@/components/schedule/matches-grid';
import { ScheduleExportButtons } from '@/components/export/schedule-export-buttons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const metadata: Metadata = {
  title: 'Calendrier - NBA',
  description: 'Consultez tous les matchs passés et à venir de la NBA avec scores en direct.',
};

// ISR - Revalidation configurée dans getAllNBAMatches() (1h)

export default async function SchedulePage() {
  // Fetch direct depuis Server Component
  const matches = await getAllNBAMatches();

  const finishedMatches = matches.filter((m) => m.status === 'finished');
  const upcomingMatches = matches.filter((m) => m.status === 'scheduled');
  const liveMatches = matches.filter((m) => m.status === 'live');

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4 mb-4">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-center"
            style={{ fontFamily: 'var(--font-bebas)' }}
          >
            Calendrier des Matchs
          </h1>
          <div className="sm:ml-4">
            <ScheduleExportButtons matches={matches} />
          </div>
        </div>
        <p className="text-lg sm:text-xl text-muted-foreground text-center">Suivez tous les matchs de la saison</p>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="mb-8 grid w-full grid-cols-3 lg:w-[400px] lg:mx-auto">
          <TabsTrigger value="upcoming">À venir ({upcomingMatches.length})</TabsTrigger>
          <TabsTrigger value="live">En direct ({liveMatches.length})</TabsTrigger>
          <TabsTrigger value="finished">Terminés ({finishedMatches.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-6">
          <MatchesGrid matches={upcomingMatches} itemsPerPage={9} />
        </TabsContent>

        <TabsContent value="live" className="space-y-6">
          <MatchesGrid matches={liveMatches} itemsPerPage={9} />
        </TabsContent>

        <TabsContent value="finished" className="space-y-6">
          <MatchesGrid matches={finishedMatches} itemsPerPage={12} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
