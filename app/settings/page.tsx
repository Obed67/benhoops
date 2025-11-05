import { Metadata } from 'next';
import { NotificationSettings } from '@/components/settings/notification-settings';
import { TestNotifications } from '@/components/settings/test-notifications';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: 'Paramètres - BenHoops',
  description: 'Gérez vos préférences et paramètres de notifications',
};

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Paramètres</h1>
          <p className="text-muted-foreground">
            Gérez vos préférences et paramètres de l'application
          </p>
        </div>

        <Separator className="my-6" />

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>
            <div className="space-y-6">
              <NotificationSettings />
              <TestNotifications />
            </div>
          </section>

          {/* Placeholder pour futures sections */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Préférences</h2>
            <div className="text-sm text-muted-foreground">
              D'autres options de paramètres seront disponibles prochainement
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
