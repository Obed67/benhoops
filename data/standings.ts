export interface Standing {
  teamId: string;
  played: number;
  won: number;
  lost: number;
  pointsFor: number;
  pointsAgainst: number;
  pointsDiff: number;
  winPercentage: number;
  streak: string;
}

export const standings: Standing[] = [
  {
    teamId: '4',
    played: 3,
    won: 3,
    lost: 0,
    pointsFor: 312,
    pointsAgainst: 285,
    pointsDiff: 27,
    winPercentage: 1.0,
    streak: 'W3',
  },
  {
    teamId: '2',
    played: 3,
    won: 3,
    lost: 0,
    pointsFor: 308,
    pointsAgainst: 291,
    pointsDiff: 17,
    winPercentage: 1.0,
    streak: 'W3',
  },
  {
    teamId: '8',
    played: 2,
    won: 2,
    lost: 0,
    pointsFor: 190,
    pointsAgainst: 178,
    pointsDiff: 12,
    winPercentage: 1.0,
    streak: 'W2',
  },
  {
    teamId: '6',
    played: 2,
    won: 1,
    lost: 1,
    pointsFor: 146,
    pointsAgainst: 149,
    pointsDiff: -3,
    winPercentage: 0.5,
    streak: 'W1',
  },
  {
    teamId: '5',
    played: 2,
    won: 1,
    lost: 1,
    pointsFor: 149,
    pointsAgainst: 146,
    pointsDiff: 3,
    winPercentage: 0.5,
    streak: 'L1',
  },
  {
    teamId: '1',
    played: 2,
    won: 0,
    lost: 2,
    pointsFor: 203,
    pointsAgainst: 215,
    pointsDiff: -12,
    winPercentage: 0.0,
    streak: 'L2',
  },
  {
    teamId: '3',
    played: 2,
    won: 0,
    lost: 2,
    pointsFor: 185,
    pointsAgainst: 193,
    pointsDiff: -8,
    winPercentage: 0.0,
    streak: 'L2',
  },
  {
    teamId: '7',
    played: 1,
    won: 0,
    lost: 1,
    pointsFor: 89,
    pointsAgainst: 95,
    pointsDiff: -6,
    winPercentage: 0.0,
    streak: 'L1',
  },
];
