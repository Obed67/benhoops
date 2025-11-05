import type { Match, Team } from '@/lib/types';

// ============================================
// STATISTIQUES D'ÉQUIPE
// ============================================

export interface TeamStats {
  teamId: string;
  teamName: string;
  played: number;
  wins: number;
  losses: number;
  winRate: number;
  totalPointsScored: number;
  totalPointsConceded: number;
  averagePointsScored: number;
  averagePointsConceded: number;
  pointsDifference: number;
  homeRecord: { wins: number; losses: number };
  awayRecord: { wins: number; losses: number };
  lastFiveGames: ('W' | 'L')[];
  currentStreak: { type: 'W' | 'L'; count: number };
}

/**
 * Calculer les statistiques complètes d'une équipe
 */
export function calculateTeamStats(team: Team, matches: Match[]): TeamStats {
  const teamMatches = matches.filter(
    (m) => m.status === 'finished' && (m.homeTeamId === team.id || m.awayTeamId === team.id)
  );

  let wins = 0;
  let losses = 0;
  let totalPointsScored = 0;
  let totalPointsConceded = 0;
  let homeWins = 0;
  let homeLosses = 0;
  let awayWins = 0;
  let awayLosses = 0;
  const lastFiveResults: ('W' | 'L')[] = [];

  // Analyser chaque match
  teamMatches.forEach((match) => {
    const isHome = match.homeTeamId === team.id;
    const teamScore = isHome ? match.homeScore : match.awayScore;
    const opponentScore = isHome ? match.awayScore : match.homeScore;

    if (teamScore === null || opponentScore === null) return;

    totalPointsScored += teamScore;
    totalPointsConceded += opponentScore;

    const won = teamScore > opponentScore;

    if (won) {
      wins++;
      if (isHome) homeWins++;
      else awayWins++;
      lastFiveResults.unshift('W');
    } else {
      losses++;
      if (isHome) homeLosses++;
      else awayLosses++;
      lastFiveResults.unshift('L');
    }
  });

  // Garder seulement les 5 derniers
  const lastFive = lastFiveResults.slice(0, 5);

  // Calculer la série actuelle
  let currentStreak = { type: lastFive[0] || 'L', count: 0 };
  if (lastFive.length > 0) {
    const streakType = lastFive[0];
    currentStreak.type = streakType;
    for (const result of lastFive) {
      if (result === streakType) currentStreak.count++;
      else break;
    }
  }

  const played = wins + losses;

  return {
    teamId: team.id,
    teamName: team.name,
    played,
    wins,
    losses,
    winRate: played > 0 ? (wins / played) * 100 : 0,
    totalPointsScored,
    totalPointsConceded,
    averagePointsScored: played > 0 ? totalPointsScored / played : 0,
    averagePointsConceded: played > 0 ? totalPointsConceded / played : 0,
    pointsDifference: totalPointsScored - totalPointsConceded,
    homeRecord: { wins: homeWins, losses: homeLosses },
    awayRecord: { wins: awayWins, losses: awayLosses },
    lastFiveGames: lastFive,
    currentStreak,
  };
}

// ============================================
// HEAD-TO-HEAD
// ============================================

export interface HeadToHeadStats {
  team1Wins: number;
  team2Wins: number;
  draws: number;
  totalMatches: number;
  lastMeetings: {
    date: string;
    team1Score: number;
    team2Score: number;
    winner: string;
  }[];
  averageScoreTeam1: number;
  averageScoreTeam2: number;
}

/**
 * Calculer les statistiques face-à-face entre 2 équipes
 */
export function calculateHeadToHead(
  team1Id: string,
  team2Id: string,
  matches: Match[]
): HeadToHeadStats {
  const h2hMatches = matches.filter(
    (m) =>
      m.status === 'finished' &&
      ((m.homeTeamId === team1Id && m.awayTeamId === team2Id) ||
        (m.homeTeamId === team2Id && m.awayTeamId === team1Id))
  );

  let team1Wins = 0;
  let team2Wins = 0;
  let draws = 0;
  let totalScoreTeam1 = 0;
  let totalScoreTeam2 = 0;

  const lastMeetings = h2hMatches
    .slice(0, 5)
    .map((match) => {
      const isTeam1Home = match.homeTeamId === team1Id;
      const team1Score = isTeam1Home ? match.homeScore! : match.awayScore!;
      const team2Score = isTeam1Home ? match.awayScore! : match.homeScore!;

      totalScoreTeam1 += team1Score;
      totalScoreTeam2 += team2Score;

      let winner = 'Draw';
      if (team1Score > team2Score) {
        team1Wins++;
        winner = 'Team 1';
      } else if (team2Score > team1Score) {
        team2Wins++;
        winner = 'Team 2';
      } else {
        draws++;
      }

      return {
        date: match.date,
        team1Score,
        team2Score,
        winner,
      };
    })
    .reverse();

  return {
    team1Wins,
    team2Wins,
    draws,
    totalMatches: h2hMatches.length,
    lastMeetings,
    averageScoreTeam1: h2hMatches.length > 0 ? totalScoreTeam1 / h2hMatches.length : 0,
    averageScoreTeam2: h2hMatches.length > 0 ? totalScoreTeam2 / h2hMatches.length : 0,
  };
}

// ============================================
// STATISTIQUES LIGUE
// ============================================

export interface LeagueStats {
  totalGames: number;
  averageScore: number;
  highestScore: { team: string; score: number; date: string };
  lowestScore: { team: string; score: number; date: string };
  biggestWin: { winner: string; loser: string; margin: number; date: string };
  topScorers: { team: string; averagePoints: number }[];
}

/**
 * Calculer les statistiques globales de la ligue
 */
export function calculateLeagueStats(teams: Team[], matches: Match[]): LeagueStats {
  const finishedMatches = matches.filter((m) => m.status === 'finished');

  let totalPoints = 0;
  let highestScore = { team: '', score: 0, date: '' };
  let lowestScore = { team: '', score: 999, date: '' };
  let biggestWin = { winner: '', loser: '', margin: 0, date: '' };

  finishedMatches.forEach((match) => {
    const homeScore = match.homeScore ?? 0;
    const awayScore = match.awayScore ?? 0;

    totalPoints += homeScore + awayScore;

    // Plus haut score
    if (homeScore > highestScore.score) {
      highestScore = { team: match.homeTeamName, score: homeScore, date: match.date };
    }
    if (awayScore > highestScore.score) {
      highestScore = { team: match.awayTeamName, score: awayScore, date: match.date };
    }

    // Plus bas score
    if (homeScore < lowestScore.score && homeScore > 0) {
      lowestScore = { team: match.homeTeamName, score: homeScore, date: match.date };
    }
    if (awayScore < lowestScore.score && awayScore > 0) {
      lowestScore = { team: match.awayTeamName, score: awayScore, date: match.date };
    }

    // Plus grande victoire
    const margin = Math.abs(homeScore - awayScore);
    if (margin > biggestWin.margin) {
      biggestWin = {
        winner: homeScore > awayScore ? match.homeTeamName : match.awayTeamName,
        loser: homeScore > awayScore ? match.awayTeamName : match.homeTeamName,
        margin,
        date: match.date,
      };
    }
  });

  // Top scorers (moyenne par équipe)
  const teamAverages = teams
    .map((team) => {
      const teamStats = calculateTeamStats(team, matches);
      return {
        team: team.name,
        averagePoints: teamStats.averagePointsScored,
      };
    })
    .sort((a, b) => b.averagePoints - a.averagePoints)
    .slice(0, 10);

  return {
    totalGames: finishedMatches.length,
    averageScore: finishedMatches.length > 0 ? totalPoints / (finishedMatches.length * 2) : 0,
    highestScore,
    lowestScore,
    biggestWin,
    topScorers: teamAverages,
  };
}
