'use client';

import { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function TeamError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Team page error:', error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="max-w-lg mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle className="text-2xl">Impossible de charger l'équipe</CardTitle>
          <CardDescription>
            Une erreur s'est produite lors du chargement des informations de l'équipe.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2 justify-center">
            <Button onClick={reset} variant="default">
              Réessayer
            </Button>
            <Button onClick={() => (window.location.href = '/teams')} variant="outline">
              Voir toutes les équipes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
