import { useParams } from "react-router";
import PlayerStatsTable from "./components/PlayerStatsTable";
import QuestRecomendations from "./components/QuestRecomendations";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StarIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Player = () => {
  const { username } = useParams();
  const LOCAL_STORAGE_KEY = "RS3PD_v1_favorite_users";

  const [favorites, setFavorites] = useState<string[]>([]);
  const [foregroundColor, setForegroundColor] = useState("0, 0%, 100%");

  useEffect(() => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
      setFavorites(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    const color = getComputedStyle(document.documentElement)
      .getPropertyValue("--foreground")
      .trim();
    setForegroundColor(color);
  }, []);

  const isFavorited = useMemo(() => {
    return username && favorites.includes(username);
  }, [username, favorites]);

  const { toast } = useToast();

  const showToast = (message: string) => {
    toast({
      title: "Updated Favorites",
      description: message,
      duration: 3000,
      variant: "default"
    });
  };

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
                  {username}
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
            </div>
          )}
        </div>

        <div className="col-start-3 col-end-7 row-start-1 row-end-2 border-secondary border rounded-md">
          {username && <PlayerStatsTable username={username} />}
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

        <ScrollArea className="col-start-7 col-end-11 row-start-1 row-end-2 max-h-[2165px] border-secondary border rounded-md">
          <QuestRecomendations />
        </ScrollArea>
      </div>
    </>
  );
};

export default Player;
