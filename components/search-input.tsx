'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  const handleSearch = (value: string) => {
    setQuery(value);
    startTransition(() => {
      if (value.trim()) {
        router.push(`/search?q=${encodeURIComponent(value.trim())}`);
      } else {
        router.push('/search');
      }
    });
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Rechercher équipes, joueurs, matchs..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className="pl-10 text-lg"
        disabled={isPending}
      />
    </div>
  );
}
