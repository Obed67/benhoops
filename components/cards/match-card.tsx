import type { Match } from '@/lib/types';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface MatchCardProps {
  match: Match;
}

export function MatchCard({ match }: MatchCardProps) {
  const matchDate = new Date(match.date);

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <Badge
            variant={
              match.status === 'live'
                ? 'default'
                : match.status === 'finished'
                ? 'secondary'
                : 'outline'
            }
            className={match.status === 'live' ? 'animate-pulse' : ''}
          >
            {match.status === 'live'
              ? 'En direct'
              : match.status === 'finished'
              ? 'Terminé'
              : format(matchDate, 'dd MMM yyyy', { locale: fr })}
          </Badge>
          {match.status === 'scheduled' && (
            <span className="text-sm text-muted-foreground">{match.time}</span>
          )}
        </div>

        <div className="grid grid-cols-3 items-center gap-4">
          <div className="flex flex-col items-center space-y-2">
            <div className="h-14 w-14 relative">
              <Image
                src={match.homeTeamLogo}
                alt={`${match.homeTeamName} logo`}
                fill
                sizes="56px"
                className="object-contain"
              />
            </div>
            <p className="text-center text-sm font-medium">{match.homeTeamName}</p>
          </div>

          <div className="flex flex-col items-center justify-center space-y-1">
            {match.status === 'finished' || match.status === 'live' ? (
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold">{match.homeScore}</span>
                <span className="text-muted-foreground">-</span>
                <span className="text-3xl font-bold">{match.awayScore}</span>
              </div>
            ) : (
              <span className="text-lg font-semibold text-muted-foreground">VS</span>
            )}
          </div>

          <div className="flex flex-col items-center space-y-2">
            <div className="h-14 w-14 relative">
              <Image
                src={match.awayTeamLogo}
                alt={`${match.awayTeamName} logo`}
                fill
                sizes="56px"
                className="object-contain"
              />
            </div>
            <p className="text-center text-sm font-medium">{match.awayTeamName}</p>
          </div>
        </div>

        {match.venue && (
          <p className="mt-4 text-center text-xs text-muted-foreground">{match.venue}</p>
        )}
      </CardContent>
    </Card>
  );
}
