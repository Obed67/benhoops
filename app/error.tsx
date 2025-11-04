'use client';

import { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log l'erreur dans la console
    console.error('Error boundary caught:', error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen flex items-center justify-center">
      <Card className="max-w-lg w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle className="text-2xl">Une erreur est survenue</CardTitle>
          <CardDescription>
            Désolé, une erreur inattendue s'est produite lors du chargement de cette page.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {process.env.NODE_ENV === 'development' && (
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm font-mono text-muted-foreground break-all">{error.message}</p>
            </div>
          )}
          <div className="flex gap-2 justify-center">
            <Button onClick={reset} variant="default">
              Réessayer
            </Button>
            <Button onClick={() => (window.location.href = '/')} variant="outline">
              Retour à l'accueil
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
