import { useQuery } from "@tanstack/react-query";

export interface MonthData {
  xpGain: number;
  timestamp: number;
  rank: number;
}

export interface SkillExpData {
  skillId: number;
  totalXp: number;
  averageXpGain: number;
  totalGain: number;
  monthData: MonthData[];
}

interface APIResponse {
  monthlyXpGain: SkillExpData[];
  loggedIn: string;
}

export const getExperienceHistory = (username: string, skillId: number) => {
    return useQuery<APIResponse, Error>({
      queryKey: [`PlayerXpHistory`, username],
      queryFn: async () => {
        const response = await fetch(
          `https://api.rs3pd.com/api/v1/experience-history?username=${username}&skillId=${skillId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch player exp history");
        }
        return response.json();
      },
      enabled: !!username,
    });
  };
  