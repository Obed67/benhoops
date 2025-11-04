'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExpandableTextProps {
  text: string;
  maxLines?: number;
  className?: string;
}

export function ExpandableText({ text, maxLines = 6, className = '' }: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Vérifier si le texte est assez long pour nécessiter un bouton "Voir plus"
  // Approximation: ~100 caractères par ligne
  const isLongText = text.length > maxLines * 100;

  // Map pour les classes line-clamp (Tailwind ne supporte pas les valeurs dynamiques)
  const lineClampClasses: Record<number, string> = {
    3: 'line-clamp-3',
    4: 'line-clamp-4',
    5: 'line-clamp-5',
    6: 'line-clamp-6',
    12: 'line-clamp-12',
  };

  const clampClass = lineClampClasses[maxLines] || 'line-clamp-6';

  return (
    <div>
      <p
        className={cn(
          'text-muted-foreground leading-relaxed',
          !isExpanded && clampClass,
          className
        )}
      >
        {text}
      </p>
      {isLongText && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 text-primary hover:text-primary/90 hover:text-white"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="mr-1 h-4 w-4" />
              Voir moins
            </>
          ) : (
            <>
              <ChevronDown className="mr-1 h-4 w-4" />
              Voir plus
            </>
          )}
        </Button>
      )}
    </div>
  );
}
