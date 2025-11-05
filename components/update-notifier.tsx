'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

export function UpdateNotifier() {
  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return;
    }

    // Écouter les messages du Service Worker
    navigator.serviceWorker.addEventListener('message', (event) => {
      if (event.data?.type === 'SW_UPDATED') {
        console.log('🔄 Nouvelle version détectée:', event.data.version);
        setShowUpdate(true);
      }
    });

    // Vérifier les mises à jour du Service Worker toutes les 30 minutes
    const checkForUpdates = () => {
      navigator.serviceWorker.getRegistration().then((registration) => {
        registration?.update();
      });
    };

    const interval = setInterval(checkForUpdates, 30 * 60 * 1000); // 30 minutes

    return () => clearInterval(interval);
  }, []);

  const handleUpdate = () => {
    // Recharger la page pour obtenir la nouvelle version
    window.location.reload();
  };

  if (!showUpdate) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm animate-in slide-in-from-bottom-5">
      <div className="rounded-lg border border-orange-500 bg-background p-4 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-orange-500/10 p-2">
            <RefreshCw className="h-5 w-5 text-orange-500" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">Mise à jour disponible</h3>
            <p className="text-sm text-muted-foreground">
              Une nouvelle version de BenHoops est disponible.
            </p>
            <div className="mt-3 flex gap-2">
              <Button
                size="sm"
                onClick={handleUpdate}
                className="bg-orange-600 hover:bg-orange-700"
              >
                Mettre à jour
              </Button>
              <Button size="sm" variant="outline" onClick={() => setShowUpdate(false)}>
                Plus tard
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
