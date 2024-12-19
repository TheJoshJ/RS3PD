import { useParams } from "react-router";
import PlayerStatsTable from "./components/PlayerStatsTable";
import QuestTable from "./components/QuestTable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StarIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import ProfileWidget from "./components/ProfileWidget";
import { getPlayerData } from "@/hooks/getPlayerData";

const Player = () => {
  const { username } = useParams();
  const LOCAL_STORAGE_KEY = "RS3PD_v1_favorite_users";

  const [favorites, setFavorites] = useState<string[]>([]);
  const [foregroundColor, setForegroundColor] = useState("0, 0%, 100%");

  const { data: playerData, isLoading: isPlayerDataLoading } = getPlayerData(
    username || "",
    true
  );

  useEffect(() => {
    const favoritesData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (favoritesData) {
      setFavorites(JSON.parse(favoritesData));
    }
  }, []);

  useEffect(() => {
    const color = getComputedStyle(document.documentElement)
      .getPropertyValue("--foreground")
      .trim();
    setForegroundColor(color);
  }, []);

  const { toast } = useToast();

  const showToast = (message: string) => {
    toast({
      title: "Updated Favorites",
      description: message,
      duration: 3000,
      variant: "default",
    });
  };

  const isFavorited = useMemo(() => {
    return username && favorites.includes(username);
  }, [username, favorites]);

  const handleFavoriteToggle = () => {
    if (!username) return;

    if (isFavorited) {
      // Remove
      const updatedFavorites = favorites.filter((user) => user !== username);
      setFavorites(updatedFavorites);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedFavorites));
      showToast(`Removed ${username} from your favorites`);
    } else {
      // Add
      const updatedFavorites = [...favorites, username];
      setFavorites(updatedFavorites);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedFavorites));
      showToast(`Added ${username} to your favorites`);
    }
  };

  return (
    <>
      <div className="grid grid-cols-10 grid-rows-[auto] px-8 gap-4">
        <div className="col-start-1 col-end-3 row-start-1 row-end-2 border-secondary border rounded-md">
          {username && (
            <div>
              <div
                className={
                  "flex flex-row items-center border-b justify-between pl-1 pr-5"
                }
              >
                <h2 className="scroll-m-20  p-2 text-3xl font-semibold tracking-tight first:mt-0">
                  {playerData?.name || username}
                </h2>
                {isFavorited ? (
                  <StarIcon
                    fill={`hsl(${foregroundColor})`}
                    onClick={handleFavoriteToggle}
                  />
                ) : (
                  <StarIcon onClick={handleFavoriteToggle} />
                )}
              </div>
              <ProfileWidget>Widget 1</ProfileWidget>
              <ProfileWidget>Widget 2</ProfileWidget>
              <ProfileWidget>Widget 3</ProfileWidget>
            </div>
          )}
        </div>

        <div className="col-start-3 col-end-8 row-start-1 row-end-2 border-secondary border rounded-md">
          {username && (
            <PlayerStatsTable
              playerData={playerData}
              loading={isPlayerDataLoading}
            />
          )}
          {!username && (
            <div>
              <div>
                I haven't gotten this set up to display without any search
                params yet... rip.
              </div>
              <div>Try searching for a player! - GIMJoshJ will work!</div>
            </div>
          )}
        </div>

        <ScrollArea className="col-start-8 col-end-11 row-start-1 row-end-2 max-h-[2165px] border-secondary border rounded-md">
          <QuestTable playerData={playerData} loading={false} />
        </ScrollArea>
      </div>
    </>
  );
};

export default Player;
