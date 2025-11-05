'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Download, Calendar, FileText, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Match } from '@/lib/types';
import { exportCalendar, exportSchedulePDF } from '@/lib/utils/export';

interface ScheduleExportButtonsProps {
  matches: Match[];
}

export function ScheduleExportButtons({ matches }: ScheduleExportButtonsProps) {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleExportCalendar = async () => {
    setIsExporting(true);
    try {
      await exportCalendar(matches);
      toast({
        title: 'Calendrier exporté',
        description: `${matches.length} matchs exportés en format .ics`,
      });
    } catch (error) {
      toast({
        title: "Erreur d'export",
        description: "Impossible d'exporter le calendrier",
        variant: 'destructive',
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportPDF = () => {
    setIsExporting(true);
    try {
      exportSchedulePDF(matches);
      toast({
        title: 'PDF généré',
        description: `Calendrier de ${matches.length} matchs téléchargé`,
      });
    } catch (error) {
      toast({
        title: "Erreur d'export",
        description: 'Impossible de générer le PDF',
        variant: 'destructive',
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2" disabled={isExporting || matches.length === 0}>
          {isExporting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          Exporter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Format d'export</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleExportCalendar} className="cursor-pointer">
          <Calendar className="mr-2 h-4 w-4" />
          <span>Calendrier (.ics)</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportPDF} className="cursor-pointer">
          <FileText className="mr-2 h-4 w-4" />
          <span>PDF</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
