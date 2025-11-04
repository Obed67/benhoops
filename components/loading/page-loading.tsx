import { Spinner } from '@/components/ui/spinner';

interface PageLoadingProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSpinner?: boolean;
}

export function PageLoading({
  text = 'Chargement...',
  size = 'xl',
  showSpinner = true,
}: PageLoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      {showSpinner && <Spinner size={size} />}
      <p className="text-muted-foreground text-lg animate-pulse">{text}</p>
    </div>
  );
}
