export interface Team {
  id: string;
  name: string;
  city: string;
  country: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  founded: number;
  arena: string;
  capacity: number;
  coach: string;
  championships: number;
}

export interface Player {
  id: string;
  name: string;
  number: number;
  position: 'PG' | 'SG' | 'SF' | 'PF' | 'C';
  height: string;
  weight: string;
  nationality: string;
  teamId: string;
  points: number;
  rebounds: number;
  assists: number;
  imageUrl: string;
}

export const teams: Team[] = [
  {
    id: '1',
    name: 'Lagos Warriors',
    city: 'Lagos',
    country: 'Nigeria',
    logo: '🏀',
    primaryColor: '#1a5f3a',
    secondaryColor: '#ffd700',
    founded: 2015,
    arena: 'Teslim Balogun Stadium',
    capacity: 24000,
    coach: 'Adetokunbo Oluwaseun',
    championships: 2,
  },
  {
    id: '2',
    name: 'Cairo Pharaohs',
    city: 'Cairo',
    country: 'Egypt',
    logo: '🏀',
    primaryColor: '#c8102e',
    secondaryColor: '#fdb927',
    founded: 2014,
    arena: 'Cairo International Stadium',
    capacity: 75000,
    coach: 'Mohamed Hassan',
    championships: 3,
  },
  {
    id: '3',
    name: 'Nairobi Thunder',
    city: 'Nairobi',
    country: 'Kenya',
    logo: '🏀',
    primaryColor: '#003da5',
    secondaryColor: '#e03a3e',
    founded: 2016,
    arena: 'Nyayo National Stadium',
    capacity: 30000,
    coach: 'David Kamau',
    championships: 1,
  },
  {
    id: '4',
    name: 'Johannesburg Lions',
    city: 'Johannesburg',
    country: 'South Africa',
    logo: '🏀',
    primaryColor: '#fdb927',
    secondaryColor: '#552583',
    founded: 2013,
    arena: 'FNB Stadium',
    capacity: 94736,
    coach: 'Thabo Mbeki',
    championships: 4,
  },
  {
    id: '5',
    name: 'Accra Stars',
    city: 'Accra',
    country: 'Ghana',
    logo: '🏀',
    primaryColor: '#006bb6',
    secondaryColor: '#ffc72c',
    founded: 2017,
    arena: 'Accra Sports Stadium',
    capacity: 40000,
    coach: 'Kwame Asante',
    championships: 0,
  },
  {
    id: '6',
    name: 'Dakar Dragons',
    city: 'Dakar',
    country: 'Senegal',
    logo: '🏀',
    primaryColor: '#ce1141',
    secondaryColor: '#000000',
    founded: 2016,
    arena: 'Stade Leopold Senghor',
    capacity: 60000,
    coach: 'Mamadou Diop',
    championships: 1,
  },
  {
    id: '7',
    name: 'Kampala Titans',
    city: 'Kampala',
    country: 'Uganda',
    logo: '🏀',
    primaryColor: '#00788c',
    secondaryColor: '#ffc72c',
    founded: 2018,
    arena: 'Mandela National Stadium',
    capacity: 45202,
    coach: 'Joseph Kiyonga',
    championships: 0,
  },
  {
    id: '8',
    name: 'Luanda Panthers',
    city: 'Luanda',
    country: 'Angola',
    logo: '🏀',
    primaryColor: '#000000',
    secondaryColor: '#c8102e',
    founded: 2015,
    arena: 'Estadio da Cidadela',
    capacity: 50000,
    coach: 'Carlos Silva',
    championships: 2,
  },
];

export const players: Player[] = [
  {
    id: '1',
    name: 'Chukwuemeka Okonkwo',
    number: 23,
    position: 'SF',
    height: '6\'8"',
    weight: '220 lbs',
    nationality: 'Nigeria',
    teamId: '1',
    points: 24.5,
    rebounds: 7.2,
    assists: 5.8,
    imageUrl: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg',
  },
  {
    id: '2',
    name: 'Ahmed El-Sayed',
    number: 7,
    position: 'PG',
    height: '6\'2"',
    weight: '185 lbs',
    nationality: 'Egypt',
    teamId: '2',
    points: 18.3,
    rebounds: 3.5,
    assists: 9.2,
    imageUrl: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg',
  },
  {
    id: '3',
    name: 'David Wanjiru',
    number: 15,
    position: 'C',
    height: '7\'0"',
    weight: '250 lbs',
    nationality: 'Kenya',
    teamId: '3',
    points: 19.8,
    rebounds: 11.4,
    assists: 2.1,
    imageUrl: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg',
  },
  {
    id: '4',
    name: 'Thabo Mokoena',
    number: 11,
    position: 'SG',
    height: '6\'5"',
    weight: '205 lbs',
    nationality: 'South Africa',
    teamId: '4',
    points: 22.7,
    rebounds: 4.9,
    assists: 4.2,
    imageUrl: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg',
  },
  {
    id: '5',
    name: 'Kwame Mensah',
    number: 3,
    position: 'PF',
    height: '6\'10"',
    weight: '235 lbs',
    nationality: 'Ghana',
    teamId: '5',
    points: 17.2,
    rebounds: 9.8,
    assists: 3.1,
    imageUrl: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg',
  },
  {
    id: '6',
    name: 'Moussa Ndiaye',
    number: 21,
    position: 'SF',
    height: '6\'7"',
    weight: '215 lbs',
    nationality: 'Senegal',
    teamId: '6',
    points: 21.3,
    rebounds: 6.5,
    assists: 4.8,
    imageUrl: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg',
  },
  {
    id: '7',
    name: 'John Musoke',
    number: 5,
    position: 'PG',
    height: '6\'1"',
    weight: '180 lbs',
    nationality: 'Uganda',
    teamId: '7',
    points: 16.9,
    rebounds: 3.2,
    assists: 8.5,
    imageUrl: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg',
  },
  {
    id: '8',
    name: 'Miguel Santos',
    number: 32,
    position: 'C',
    height: '6\'11"',
    weight: '245 lbs',
    nationality: 'Angola',
    teamId: '8',
    points: 20.1,
    rebounds: 10.3,
    assists: 2.5,
    imageUrl: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg',
  },
];
