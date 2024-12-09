import { useQuery } from '@tanstack/react-query';

export interface activities {
  date: string;
  details: string;
  text: string;
}

export interface skillValues {
  level: number;
  xp: number;
  rank: number;
  id: number;
}

export interface PlayerData {
  magic: number;
  questsStarted: number;
  totalskill: number;
  questscomplete: number;
  questsstarted: number;
  totalXp: number;
  ranged: number;
  activities: activities[];
  skillvalues: skillValues[];
  name: string;
  melee: number;
  combatlevel: number;
  loggedIn: string;
}

export const getPlayerData = (username: string) => {
  return useQuery<PlayerData, Error>({
    queryKey: ['PlayerData', username],
    queryFn: async () => {
      const response = await fetch(
        `https://apps.runescape.com/runemetrics/profile/profile?user=${username}&activities=0`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch player data");
      }
      return response.json();
    },
    enabled: !!username,
  });
};