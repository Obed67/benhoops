// Configuration de l'API TheSportsDB

export const SPORTSDB_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_SPORTSDB_BASE_URL || 'https://www.thesportsdb.com/api/v1/json',
  apiKey: process.env.NEXT_PUBLIC_SPORTSDB_API_KEY,
  leagueId: '4387', // NBA League ID
  leagueName: 'NBA',
  sport: 'Basketball',
} as const;

// Configuration NBA Official API (gratuite, sans clé)
export const NBA_API_CONFIG = {
  baseUrl: 'https://stats.nba.com/stats',
  season: '2024-25',
  leagueId: '00',
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    Referer: 'https://www.nba.com/',
    Accept: 'application/json, text/plain, */*',
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    Origin: 'https://www.nba.com',
    Connection: 'keep-alive',
    'x-nba-stats-origin': 'stats',
    'x-nba-stats-token': 'true',
  },
  timeout: 8000, // 8 secondes max
} as const;

// API Alternative : BallDontLie (gratuite, pas de clé nécessaire)
export const ESPN_API_CONFIG = {
  baseUrl: 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba',
} as const;

// Mapping entre IDs TheSportsDB et IDs NBA Official API
// TheSportsDB ID -> NBA Team ID
export const TEAM_ID_MAPPING: Record<string, string> = {
  '134860': '1610612737', // Atlanta Hawks
  '134861': '1610612738', // Boston Celtics
  '134862': '1610612751', // Brooklyn Nets
  '134863': '1610612766', // Charlotte Hornets
  '134864': '1610612741', // Chicago Bulls
  '134865': '1610612739', // Cleveland Cavaliers
  '134866': '1610612742', // Dallas Mavericks
  '134867': '1610612743', // Denver Nuggets
  '134868': '1610612765', // Detroit Pistons
  '134869': '1610612744', // Golden State Warriors
  '134870': '1610612745', // Houston Rockets
  '134871': '1610612754', // Indiana Pacers
  '134872': '1610612746', // LA Clippers
  '134873': '1610612747', // LA Lakers
  '134874': '1610612763', // Memphis Grizzlies
  '134875': '1610612748', // Miami Heat
  '134876': '1610612749', // Milwaukee Bucks
  '134877': '1610612750', // Minnesota Timberwolves
  '134878': '1610612740', // New Orleans Pelicans
  '134879': '1610612752', // New York Knicks
  '134880': '1610612760', // Oklahoma City Thunder
  '134881': '1610612753', // Orlando Magic
  '134882': '1610612755', // Philadelphia 76ers
  '134883': '1610612756', // Phoenix Suns
  '134884': '1610612757', // Portland Trail Blazers
  '134885': '1610612758', // Sacramento Kings
  '134886': '1610612759', // San Antonio Spurs
  '134887': '1610612761', // Toronto Raptors
  '134888': '1610612762', // Utah Jazz
  '134889': '1610612764', // Washington Wizards
} as const;

// Mapping des IDs TheSportsDB -> ESPN Team Slugs
export const ESPN_TEAM_MAPPING: Record<string, string> = {
  '134860': 'atl', // Atlanta Hawks
  '134861': 'bos', // Boston Celtics
  '134862': 'bkn', // Brooklyn Nets
  '134863': 'cha', // Charlotte Hornets
  '134864': 'chi', // Chicago Bulls
  '134865': 'cle', // Cleveland Cavaliers
  '134866': 'dal', // Dallas Mavericks
  '134867': 'den', // Denver Nuggets
  '134868': 'det', // Detroit Pistons
  '134869': 'gs', // Golden State Warriors
  '134870': 'hou', // Houston Rockets
  '134871': 'ind', // Indiana Pacers
  '134872': 'lac', // LA Clippers
  '134873': 'lal', // LA Lakers
  '134874': 'mem', // Memphis Grizzlies
  '134875': 'mia', // Miami Heat
  '134876': 'mil', // Milwaukee Bucks
  '134877': 'min', // Minnesota Timberwolves
  '134878': 'no', // New Orleans Pelicans
  '134879': 'ny', // New York Knicks
  '134880': 'okc', // Oklahoma City Thunder
  '134881': 'orl', // Orlando Magic
  '134882': 'phi', // Philadelphia 76ers
  '134883': 'phx', // Phoenix Suns
  '134884': 'por', // Portland Trail Blazers
  '134885': 'sac', // Sacramento Kings
  '134886': 'sa', // San Antonio Spurs
  '134887': 'tor', // Toronto Raptors
  '134888': 'utah', // Utah Jazz
  '134889': 'wsh', // Washington Wizards
};

// Durée de revalidation pour ISR (en secondes)
export const REVALIDATE_TIME = {
  teams: 86400, // 24 heures - les équipes changent rarement
  players: 43200, // 12 heures
  matches: 3600, // 1 heure - pour obtenir les scores mis à jour
  standings: 3600, // 1 heure
} as const;

// Cache headers pour les API routes
export const CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
} as const;
