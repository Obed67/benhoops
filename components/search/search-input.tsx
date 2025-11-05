'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useTransition, useEffect, useState } from 'react';

export function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  // Débounce pour éviter trop de requêtes
  useEffect(() => {
    const timer = setTimeout(() => {
      startTransition(() => {
        if (query) {
          router.push(`/search?q=${encodeURIComponent(query)}`);
        } else {
          router.push('/search');
        }
      });
    }, 300); // Attendre 300ms après la dernière frappe

    return () => clearTimeout(timer);
  }, [query, router]);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Rechercher une équipe ou un match..."
        className="pl-10"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={isPending}
      />
      {isPending && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      )}
    </div>
  );
}
