import { useParams } from "react-router";
import PlayerStatsTable from "./components/PlayerStatsTable";

const Player = () => {
  const { username } = useParams();

  return (
    <>
      <div className="grid grid-cols-10 grid-rows-[100px_minmax(200px,_auto)] px-8 gap-4">
        <div className="col-start-1 col-end-11 row-start-1 row-end-2 border-secondary border rounded-md">
         {username ?? "tall n manly"}
        </div>
        <div className="col-start-1 col-end-3 row-start-2 row-end-3 border-secondary border rounded-md">
          This will be quick links I think?
        </div>
        <div className="col-start-3 col-end-7 row-start-2 row-end-3 border-secondary border rounded-md">
          {username && <PlayerStatsTable username={username} />}
          {!username && <div>Search for a player if there is no username in the url.</div>}
        </div>
        <div className="col-start-7 col-end-11 row-start-2 row-end-3 border-secondary border rounded-md">
          This is where the optimized quest lists will go
        </div>
      </div>
    </>
  );
};

export default Player;
