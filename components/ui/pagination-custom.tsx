'use client';

import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Afficher seulement 5 pages max autour de la page actuelle
  const getVisiblePages = () => {
    if (totalPages <= 5) return pages;

    if (currentPage <= 3) {
      return pages.slice(0, 5);
    }

    if (currentPage >= totalPages - 2) {
      return pages.slice(totalPages - 5);
    }

    return pages.slice(currentPage - 3, currentPage + 2);
  };

  const visiblePages = getVisiblePages();

  const handlePageClick = (page: number) => {
    // Animation du bouton cliqué
    const buttons = containerRef.current?.querySelectorAll('button');
    if (buttons) {
      gsap.to(buttons[page], {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut',
      });
    }
    onPageChange(page);
  };

  return (
    <div ref={containerRef} className="flex items-center justify-center gap-2 mt-8">
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="transition-all hover:scale-110 hover:rotate-[-5deg]"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {currentPage > 3 && totalPages > 5 && (
        <>
          <Button
            variant="outline"
            onClick={() => handlePageClick(1)}
            className="transition-all hover:scale-110"
          >
            1
          </Button>
          <span className="px-2">...</span>
        </>
      )}

      {visiblePages.map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? 'default' : 'outline'}
          onClick={() => handlePageClick(page)}
          className={`transition-all hover:scale-110 ${
            currentPage === page
              ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 shadow-lg shadow-orange-500/30'
              : ''
          }`}
        >
          {page}
        </Button>
      ))}

      {currentPage < totalPages - 2 && totalPages > 5 && (
        <>
          <span className="px-2">...</span>
          <Button
            variant="outline"
            onClick={() => handlePageClick(totalPages)}
            className="transition-all hover:scale-110"
          >
            {totalPages}
          </Button>
        </>
      )}

      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="transition-all hover:scale-110 hover:rotate-[5deg]"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
