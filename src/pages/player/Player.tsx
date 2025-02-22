import ProfileWidget from "./components/ProfileWidget";
import PlayerStatsTable from "./components/PlayerStatsTable";
import QuestTable from "./components/QuestTable";
import { useParams } from "react-router";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StarIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { getPlayerData } from "@/hooks/getPlayerData";
import { getSkillImage } from "@/utils/getSkillImage";
import { getSkillName } from "@/utils/getSkillName";
import { Skeleton } from "@/components/ui/skeleton";
import { Autocomplete } from "@/layout/components/Autocomplete";

const Player = () => {
  const { username } = useParams();
  const LOCAL_STORAGE_KEY = "RS3PD_v1_favorite_users";

  const [favorites, setFavorites] = useState<string[]>([]);
  const [foregroundColor, setForegroundColor] = useState("0, 0%, 100%");

  const { data: playerData, isLoading: isPlayerDataLoading } = getPlayerData(
    username || "",
    true
  );
  const noProfile = playerData?.error === "NO_PROFILE";
  const isPrivate = playerData?.error === "PROFILE_PRIVATE";
  const canDisplay = !noProfile && !isPrivate && !playerData?.error;

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
    return (
      username &&
      favorites.some((user) => user.toLowerCase() === username.toLowerCase())
    );
  }, [username, favorites]);

  const handleFavoriteToggle = () => {
    if (!username) return;

    const normalizedUsername = username.toLowerCase();

    if (isFavorited) {
      // Remove
      const updatedFavorites = favorites.filter(
        (user) => user.toLowerCase() !== normalizedUsername
      );
      setFavorites(updatedFavorites);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedFavorites));
      showToast(`Removed ${username} from your favorites`);
    } else {
      // Add
      const updatedFavorites = [...favorites, normalizedUsername];
      setFavorites(updatedFavorites);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedFavorites));
      showToast(`Added ${username} to your favorites`);
    }
  };

  // update casing in favorites list
  useEffect(() => {
    if (!playerData?.name) return;

    const apiUsername = playerData.name;
    const normalizedApiUsername = apiUsername.toLowerCase();

    const existingFavorite = favorites.find(
      (user) => user.toLowerCase() === normalizedApiUsername
    );

    if (existingFavorite && existingFavorite !== apiUsername) {
      const updatedFavorites = favorites.map((user) =>
        user.toLowerCase() === normalizedApiUsername ? apiUsername : user
      );

      setFavorites(updatedFavorites);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedFavorites));
    }
  }, [playerData?.name, favorites]);

  return (
    <>
      {/* Missing username in url */}
      {!username && (
        <div className={"flex flex-col items-center text-center"}>
          <div>
            <p className="text-3xl">🤠</p>
            <p>Woah, partner - hold your horses!</p>
            <br />
            <p>
              Looks like you haven't specified a player name you want to see
              data for.
            </p>
          </div>
          <div>
            Try searching for a player, <a href="player/GIMJoshJ">GIMJoshJ</a>{" "}
            will work!
          </div>
          <div className="pt-5">
            <Autocomplete type="user" />
          </div>
        </div>
      )}
      {/* Profile doesn't exist */}
      {noProfile && (
        <div className={"flex flex-col items-center text-center"}>
          <div>
            <p className="text-3xl">😔</p>
            <p>Oh, no!</p>
            <br />
            <p>Looks like that player doesn't seem to exist!</p>
          </div>
          <div>
            Try searching for a different player,{" "}
            <a href="GIMJoshJ">GIMJoshJ</a> will work!
          </div>
        </div>
      )}
      {/* Player is private */}
      {isPrivate && (
        <div className={"flex flex-col items-center text-center"}>
          <div>
            <p className="text-3xl">😔</p>
            <p>Oh, no!</p>
            <br />
            <p>Looks like that player doesn't have their stats public!</p>
          </div>
          <div>
            If this is your account, you can enable them on{" "}
            <a
              href="https://account.runescape.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Runescape Account
            </a>{" "}
            page.
          </div>
        </div>
      )}
      {/* Username is present and can display */}
      {username && canDisplay && (
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
                <ProfileWidget title={"Skills left to 99"}>
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(30px,1fr))] gap-2 justify-center">
                    {!playerData &&
                      Array.from({ length: 5 }).map((_, index) => (
                        <Skeleton key={index} className="h-6 w-6 col-span-1" />
                      ))}
                    {playerData?.skillvalues
                      .filter((skill) => skill.level < 99)
                      .map((skill) => (
                        <div className="flex justify-center m-0 p-0">
                          <img
                            key={skill.id}
                            src={getSkillImage(skill.id)}
                            alt={getSkillName(skill.id)}
                            className="h-6 w-6 object-contain"
                          />
                        </div>
                      ))}
                  </div>
                </ProfileWidget>

                <ProfileWidget title={"Skills left to 120"}>
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(30px,1fr))] gap-2 justify-center">
                    {!playerData &&
                      Array.from({ length: 5 }).map((_, index) => (
                        <Skeleton
                          key={index}
                          className="h-5 w-[100%] col-span-6"
                        />
                      ))}
                    {playerData?.skillvalues.map((skill) => {
                      if (
                        skill.xp >= 13034431 &&
                        skill.level >= 99 &&
                        skill.xp / 10 < 104273167
                      ) {
                        return (
                          <div className="flex justify-center m-0 p-0">
                            <img
                              key={skill.id}
                              src={getSkillImage(skill.id)}
                              alt={getSkillName(skill.id)}
                              className="h-6 w-6"
                            />
                          </div>
                        );
                      }
                    })}
                  </div>
                </ProfileWidget>
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
          </div>

          <ScrollArea className="col-start-8 col-end-11 row-start-1 row-end-2 max-h-[1755px] border-secondary border rounded-md">
            <QuestTable playerData={playerData} filter />
          </ScrollArea>
        </div>
      )}
    </>
  );
};

export default Player;
