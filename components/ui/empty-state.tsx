import { AlertCircle, Inbox, Search, WifiOff } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: 'inbox' | 'search' | 'alert' | 'offline';
  action?: React.ReactNode;
}

const icons = {
  inbox: Inbox,
  search: Search,
  alert: AlertCircle,
  offline: WifiOff,
};

export function EmptyState({
  title = 'Aucune donnée',
  description = 'Aucun résultat trouvé.',
  icon = 'inbox',
  action,
}: EmptyStateProps) {
  const Icon = icons[icon];

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] px-4 text-center">
      <div className="rounded-full bg-muted p-6 mb-4">
        <Icon className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-md mb-6">{description}</p>
      {action}
    </div>
  );
}

export function ErrorState({
  title = 'Une erreur est survenue',
  description = 'Impossible de charger les données. Veuillez réessayer plus tard.',
  retry,
}: {
  title?: string;
  description?: string;
  retry?: () => void;
}) {
  return (
    <Alert variant="destructive" className="max-w-2xl mx-auto my-8">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className="mt-2">
        {description}
        {retry && (
          <button
            onClick={retry}
            className="mt-4 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Réessayer
          </button>
        )}
      </AlertDescription>
    </Alert>
  );
}
