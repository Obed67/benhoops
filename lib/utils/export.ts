import { createEvents, EventAttributes, DateArray } from 'ics';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Match } from '@/lib/types';
import { TeamStats } from './stats';

/**
 * Convert a date string to ICS DateArray format [year, month, day, hour, minute]
 */
function toDateArray(dateStr: string, timeStr?: string): DateArray {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // ICS months are 1-indexed
  const day = date.getDate();

  if (timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return [year, month, day, hours, minutes];
  }

  return [year, month, day, 14, 0]; // Default 14h00 si pas d'heure
}

/**
 * Export matches to .ics calendar file
 */
export async function exportCalendar(matches: Match[], filename = 'benhoops-calendar.ics') {
  try {
    const events: EventAttributes[] = matches.map((match) => {
      const startDate = toDateArray(match.date, match.time);

      // Durée typique d'un match NBA: 2h30
      const endDate = [...startDate] as DateArray;
      endDate[3] = (startDate[3] || 14) + 2; // +2 heures
      endDate[4] = (startDate[4] || 0) + 30; // +30 minutes

      return {
        start: startDate,
        end: endDate,
        title: `${match.homeTeamName} vs ${match.awayTeamName}`,
        description: `Match NBA\nStade: ${match.venue || 'À confirmer'}`,
        location: match.venue || 'À confirmer',
        status: 'CONFIRMED',
        busyStatus: 'BUSY',
        organizer: { name: 'BenHoops', email: 'contact@benhoops.com' },
        categories: ['Basketball', 'NBA', 'Sports'],
      };
    });

    const { error, value } = createEvents(events);

    if (error) {
      console.error('Error creating calendar:', error);
      throw new Error('Erreur lors de la création du calendrier');
    }

    if (!value) {
      throw new Error('Aucune donnée de calendrier générée');
    }

    // Download the file
    const blob = new Blob([value], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    console.error('Export calendar error:', error);
    throw error;
  }
}

/**
 * Export stats to CSV
 */
export function exportStatsCSV(stats: TeamStats[], filename = 'benhoops-stats.csv') {
  try {
    // CSV Headers
    const headers = [
      'Équipe',
      'Victoires',
      'Défaites',
      'Taux de victoire (%)',
      'Points moyens',
      'Points encaissés',
      'Différentiel',
      'Série actuelle',
      'Domicile (V-D)',
      'Extérieur (V-D)',
    ];

    // CSV Rows
    const rows = stats.map((stat) => [
      stat.teamName,
      stat.wins,
      stat.losses,
      (stat.winRate * 100).toFixed(1),
      stat.averagePointsScored.toFixed(1),
      stat.averagePointsConceded.toFixed(1),
      stat.pointsDifference.toFixed(1),
      `${stat.currentStreak.type}${stat.currentStreak.count}`,
      `${stat.homeRecord.wins}-${stat.homeRecord.losses}`,
      `${stat.awayRecord.wins}-${stat.awayRecord.losses}`,
    ]);

    // Combine headers and rows
    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

    // Add BOM for Excel UTF-8 compatibility
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    console.error('Export CSV error:', error);
    throw error;
  }
}

/**
 * Export stats to JSON
 */
export function exportStatsJSON(stats: TeamStats[], filename = 'benhoops-stats.json') {
  try {
    const jsonContent = JSON.stringify(
      {
        exportDate: new Date().toISOString(),
        source: 'BenHoops',
        season: '2024-2025',
        stats,
      },
      null,
      2
    );

    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    console.error('Export JSON error:', error);
    throw error;
  }
}

/**
 * Export schedule to PDF
 */
export function exportSchedulePDF(matches: Match[], filename = 'benhoops-schedule.pdf') {
  try {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(20);
    doc.setTextColor(249, 115, 22); // Orange
    doc.text('BenHoops - Calendrier NBA', 14, 20);

    // Subtitle
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Généré le ${new Date().toLocaleDateString('fr-FR')}`, 14, 28);

    // Prepare table data
    const tableData = matches.map((match) => {
      const date = new Date(match.date);
      const status =
        match.homeScore !== null && match.awayScore !== null
          ? 'Terminé'
          : match.status === 'finished'
          ? 'Terminé'
          : match.status === 'live'
          ? 'En cours'
          : 'À venir';

      const score =
        match.homeScore !== null && match.awayScore !== null
          ? `${match.homeScore} - ${match.awayScore}`
          : '-';

      return [
        date.toLocaleDateString('fr-FR'),
        match.time || '14:00',
        match.homeTeamName,
        match.awayTeamName,
        score,
        status,
      ];
    });

    // Add table
    autoTable(doc, {
      head: [['Date', 'Heure', 'Domicile', 'Extérieur', 'Score', 'Statut']],
      body: tableData,
      startY: 35,
      theme: 'grid',
      headStyles: {
        fillColor: [249, 115, 22], // Orange
        textColor: 255,
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      styles: {
        fontSize: 8,
        cellPadding: 3,
      },
      columnStyles: {
        0: { cellWidth: 25 }, // Date
        1: { cellWidth: 20 }, // Heure
        2: { cellWidth: 45 }, // Domicile
        3: { cellWidth: 45 }, // Extérieur
        4: { cellWidth: 25 }, // Score
        5: { cellWidth: 25 }, // Statut
      },
    });

    // Footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(
        `Page ${i} sur ${pageCount} - BenHoops © ${new Date().getFullYear()}`,
        14,
        doc.internal.pageSize.height - 10
      );
    }

    // Save PDF
    doc.save(filename);
    return true;
  } catch (error) {
    console.error('Export PDF error:', error);
    throw error;
  }
}

/**
 * Export team stats to PDF
 */
export function exportStatsPDF(stats: TeamStats[], filename = 'benhoops-statistics.pdf') {
  try {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(20);
    doc.setTextColor(249, 115, 22);
    doc.text('BenHoops - Statistiques NBA', 14, 20);

    // Subtitle
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Saison 2024-2025 - Généré le ${new Date().toLocaleDateString('fr-FR')}`, 14, 28);

    // Prepare table data
    const tableData = stats.map((stat, index) => [
      index + 1,
      stat.teamName,
      `${stat.wins}-${stat.losses}`,
      `${(stat.winRate * 100).toFixed(1)}%`,
      stat.averagePointsScored.toFixed(1),
      stat.averagePointsConceded.toFixed(1),
      stat.pointsDifference.toFixed(1),
      `${stat.currentStreak.type}${stat.currentStreak.count}`,
    ]);

    // Add table
    autoTable(doc, {
      head: [['#', 'Équipe', 'Bilan', 'Taux', 'Pts/M', 'Enc/M', 'Diff', 'Série']],
      body: tableData,
      startY: 35,
      theme: 'grid',
      headStyles: {
        fillColor: [249, 115, 22],
        textColor: 255,
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      styles: {
        fontSize: 9,
        cellPadding: 3,
      },
      columnStyles: {
        0: { cellWidth: 10, halign: 'center' },
        1: { cellWidth: 55 },
        2: { cellWidth: 20, halign: 'center' },
        3: { cellWidth: 20, halign: 'center' },
        4: { cellWidth: 20, halign: 'center' },
        5: { cellWidth: 20, halign: 'center' },
        6: { cellWidth: 20, halign: 'center' },
        7: { cellWidth: 20, halign: 'center' },
      },
    });

    // Footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(
        `Page ${i} sur ${pageCount} - BenHoops © ${new Date().getFullYear()}`,
        14,
        doc.internal.pageSize.height - 10
      );
    }

    // Save PDF
    doc.save(filename);
    return true;
  } catch (error) {
    console.error('Export PDF error:', error);
    throw error;
  }
}
