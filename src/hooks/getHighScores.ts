import { useQuery } from "@tanstack/react-query";

export interface HighScores {
  name: string;
  score: string;
  rank: string;
}

const fetchHighscoreData = async (): Promise<HighScores[]> => {
  const response = await fetch(
    "https://secure.runescape.com/m=hiscore/ranking.json?table=0&category=0&size=50"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch high score data");
  }

  return response.json();
};

export const getHighScores = () => {
  return useQuery({
    queryKey: ["PlayerData"],
    queryFn: () => fetchHighscoreData(),
  });
};
