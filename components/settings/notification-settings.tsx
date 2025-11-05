'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Bell, BellOff, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function NotificationSettings() {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    matchStart: true,
    matchEnd: true,
    liveScores: false,
    favoriteTeam: true,
  });
  const { toast } = useToast();

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }

    // Charger les paramètres depuis localStorage
    const saved = localStorage.getItem('notificationSettings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      toast({
        title: 'Non supporté',
        description: 'Votre navigateur ne supporte pas les notifications',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await Notification.requestPermission();
      setPermission(result);

      if (result === 'granted') {
        toast({
          title: 'Notifications activées',
          description: 'Vous recevrez maintenant des notifications',
        });

        // Envoyer une notification de test
        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
          navigator.serviceWorker.ready.then((registration) => {
            registration.showNotification('BenHoops', {
              body: 'Les notifications sont maintenant activées !',
              icon: '/icon-192.png',
              badge: '/icon-192.png',
            });
          });
        }
      } else {
        toast({
          title: 'Notifications bloquées',
          description: 'Vous avez refusé les notifications',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error requesting permission:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de demander la permission',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateSetting = (key: keyof typeof settings, value: boolean) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('notificationSettings', JSON.stringify(newSettings));

    toast({
      title: 'Paramètre mis à jour',
      description: 'Vos préférences ont été sauvegardées',
    });
  };

  return (
    <div className="space-y-6">
      {/* Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {permission === 'granted' ? (
              <Bell className="h-5 w-5 text-green-600" />
            ) : (
              <BellOff className="h-5 w-5 text-orange-600" />
            )}
            État des Notifications
          </CardTitle>
          <CardDescription>Gérez vos préférences de notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="font-semibold">Statut actuel</div>
              <div className="flex items-center gap-2">
                {permission === 'granted' && (
                  <Badge className="bg-green-600">
                    <Check className="h-3 w-3 mr-1" />
                    Activées
                  </Badge>
                )}
                {permission === 'denied' && (
                  <Badge variant="destructive">
                    <X className="h-3 w-3 mr-1" />
                    Bloquées
                  </Badge>
                )}
                {permission === 'default' && <Badge variant="secondary">Non configurées</Badge>}
              </div>
            </div>

            {permission !== 'granted' && (
              <Button
                onClick={requestPermission}
                disabled={isLoading || permission === 'denied'}
                className="bg-orange-600 hover:bg-orange-700"
              >
                {isLoading ? 'Chargement...' : 'Activer les notifications'}
              </Button>
            )}
          </div>

          {permission === 'denied' && (
            <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive">
                Les notifications sont bloquées. Veuillez les autoriser dans les paramètres de votre
                navigateur.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Settings */}
      {permission === 'granted' && (
        <Card>
          <CardHeader>
            <CardTitle>Préférences de Notifications</CardTitle>
            <CardDescription>
              Choisissez les événements pour lesquels vous souhaitez recevoir des notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="matchStart" className="font-semibold">
                  Début des matchs
                </Label>
                <div className="text-sm text-muted-foreground">
                  Notification 15 minutes avant le coup d'envoi
                </div>
              </div>
              <Switch
                id="matchStart"
                checked={settings.matchStart}
                onCheckedChange={(checked) => updateSetting('matchStart', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="matchEnd" className="font-semibold">
                  Fin des matchs
                </Label>
                <div className="text-sm text-muted-foreground">
                  Notification avec le score final
                </div>
              </div>
              <Switch
                id="matchEnd"
                checked={settings.matchEnd}
                onCheckedChange={(checked) => updateSetting('matchEnd', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="liveScores" className="font-semibold">
                  Scores en direct
                </Label>
                <div className="text-sm text-muted-foreground">
                  Mises à jour pendant les matchs en cours
                </div>
              </div>
              <Switch
                id="liveScores"
                checked={settings.liveScores}
                onCheckedChange={(checked) => updateSetting('liveScores', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="favoriteTeam" className="font-semibold">
                  Équipe favorite
                </Label>
                <div className="text-sm text-muted-foreground">
                  Notifications pour votre équipe préférée
                </div>
              </div>
              <Switch
                id="favoriteTeam"
                checked={settings.favoriteTeam}
                onCheckedChange={(checked) => updateSetting('favoriteTeam', checked)}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
