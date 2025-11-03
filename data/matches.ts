export interface Match {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  homeScore: number | null;
  awayScore: number | null;
  date: string;
  time: string;
  venue: string;
  status: 'scheduled' | 'live' | 'finished';
  quarter?: string;
  attendance?: number;
}

export const matches: Match[] = [
  {
    id: '1',
    homeTeamId: '1',
    awayTeamId: '2',
    homeScore: 98,
    awayScore: 105,
    date: '2025-10-28',
    time: '19:00',
    venue: 'Teslim Balogun Stadium',
    status: 'finished',
    attendance: 22500,
  },
  {
    id: '2',
    homeTeamId: '3',
    awayTeamId: '4',
    homeScore: 87,
    awayScore: 92,
    date: '2025-10-29',
    time: '18:30',
    venue: 'Nyayo National Stadium',
    status: 'finished',
    attendance: 28000,
  },
  {
    id: '3',
    homeTeamId: '5',
    awayTeamId: '6',
    homeScore: 76,
    awayScore: 73,
    date: '2025-10-30',
    time: '20:00',
    venue: 'Accra Sports Stadium',
    status: 'finished',
    attendance: 35000,
  },
  {
    id: '4',
    homeTeamId: '7',
    awayTeamId: '8',
    homeScore: 89,
    awayScore: 95,
    date: '2025-10-31',
    time: '19:30',
    venue: 'Mandela National Stadium',
    status: 'finished',
    attendance: 41000,
  },
  {
    id: '5',
    homeTeamId: '2',
    awayTeamId: '3',
    homeScore: 101,
    awayScore: 98,
    date: '2025-11-01',
    time: '18:00',
    venue: 'Cairo International Stadium',
    status: 'finished',
    attendance: 65000,
  },
  {
    id: '6',
    homeTeamId: '4',
    awayTeamId: '1',
    homeScore: 110,
    awayScore: 105,
    date: '2025-11-02',
    time: '19:00',
    venue: 'FNB Stadium',
    status: 'finished',
    attendance: 85000,
  },
  {
    id: '7',
    homeTeamId: '6',
    awayTeamId: '7',
    homeScore: null,
    awayScore: null,
    date: '2025-11-04',
    time: '20:00',
    venue: 'Stade Leopold Senghor',
    status: 'scheduled',
  },
  {
    id: '8',
    homeTeamId: '8',
    awayTeamId: '5',
    homeScore: null,
    awayScore: null,
    date: '2025-11-05',
    time: '19:30',
    venue: 'Estadio da Cidadela',
    status: 'scheduled',
  },
  {
    id: '9',
    homeTeamId: '1',
    awayTeamId: '3',
    homeScore: null,
    awayScore: null,
    date: '2025-11-06',
    time: '18:30',
    venue: 'Teslim Balogun Stadium',
    status: 'scheduled',
  },
  {
    id: '10',
    homeTeamId: '2',
    awayTeamId: '4',
    homeScore: null,
    awayScore: null,
    date: '2025-11-07',
    time: '20:00',
    venue: 'Cairo International Stadium',
    status: 'scheduled',
  },
];
