import Link from 'next/link';
import { Team } from '@/data/teams';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Trophy } from 'lucide-react';

interface TeamCardProps {
  team: Team;
}

export function TeamCard({ team }: TeamCardProps) {
  return (
    <Link href={`/teams/${team.id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg hover:scale-[1.02] duration-300">
        <CardHeader
          className="h-32 relative"
          style={{
            background: `linear-gradient(135deg, ${team.primaryColor} 0%, ${team.secondaryColor} 100%)`,
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl opacity-90 transition-transform group-hover:scale-110 duration-300">
              {team.logo}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="text-lg font-bold mb-1">{team.name}</h3>
          <p className="text-sm text-muted-foreground mb-3">
            {team.city}, {team.country}
          </p>
          {team.championships > 0 && (
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Trophy className="h-3 w-3" />
              <span>
                {team.championships} {team.championships === 1 ? 'titre' : 'titres'}
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
