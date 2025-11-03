import { Player } from '@/data/teams';
import { Card, CardContent } from '@/components/ui/card';

interface PlayerCardProps {
  player: Player;
}

export function PlayerCard({ player }: PlayerCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted text-2xl font-bold">
            #{player.number}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">{player.name}</h3>
            <p className="text-sm text-muted-foreground">
              {player.position} • {player.height} • {player.weight}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{player.nationality}</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4 border-t pt-4">
          <div className="text-center">
            <p className="text-xl font-bold">{player.points}</p>
            <p className="text-xs text-muted-foreground">PTS</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">{player.rebounds}</p>
            <p className="text-xs text-muted-foreground">REB</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">{player.assists}</p>
            <p className="text-xs text-muted-foreground">AST</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
