import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-200px)] flex-col items-center justify-center px-4 text-center">
      <div className="text-8xl mb-8">🏀</div>
      <h1 className="mb-4 text-6xl font-bold">404</h1>
      <p className="mb-8 text-xl text-muted-foreground">
        Désolé, la page que vous recherchez n'existe pas.
      </p>
      <Link href="/">
        <Button size="lg">
          <Home className="mr-2 h-5 w-5" />
          Retour à l'accueil
        </Button>
      </Link>
    </div>
  );
}
