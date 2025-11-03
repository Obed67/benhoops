import { Metadata } from 'next';
import { teams } from '@/data/teams';
import { TeamCard } from '@/components/cards/team-card';

export const metadata: Metadata = {
  title: 'Équipes - African Basketball League',
  description: 'Découvrez toutes les équipes de la ligue africaine de basketball professionnel.',
};

export default function TeamsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1
          className="mb-4 text-5xl font-bold md:text-6xl"
          style={{ fontFamily: 'var(--font-bebas)' }}
        >
          Nos Équipes
        </h1>
        <p className="text-xl text-muted-foreground">
          {teams.length} équipes professionnelles à travers l'Afrique
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {teams.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
    </div>
  );
}
