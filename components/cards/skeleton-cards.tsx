import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function TeamCardSkeleton() {
  return (
    <Card className="overflow-hidden animate-pulse">
      <CardHeader className="h-32 relative p-0 bg-muted" />
      <CardContent className="pt-6">
        <div className="space-y-3">
          <div className="h-6 bg-muted rounded w-3/4"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
          <div className="flex gap-2 mt-4">
            <div className="h-6 w-16 bg-muted rounded-full"></div>
            <div className="h-6 w-16 bg-muted rounded-full"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function MatchCardSkeleton() {
  return (
    <Card className="overflow-hidden animate-pulse">
      <CardContent className="p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col items-center gap-2 flex-1">
            <div className="h-16 w-16 bg-muted rounded-full"></div>
            <div className="h-4 bg-muted rounded w-20"></div>
          </div>
          <div className="text-center">
            <div className="h-8 w-24 bg-muted rounded mx-auto"></div>
            <div className="h-3 bg-muted rounded w-16 mx-auto mt-2"></div>
          </div>
          <div className="flex flex-col items-center gap-2 flex-1">
            <div className="h-16 w-16 bg-muted rounded-full"></div>
            <div className="h-4 bg-muted rounded w-20"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function PlayerCardSkeleton() {
  return (
    <Card className="overflow-hidden animate-pulse">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 bg-muted rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="h-5 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
