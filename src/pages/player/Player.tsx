import { useParams } from "react-router";
import PlayerStatsTable from "./components/PlayerStatsTable";
import QuestRecomendations from "./components/QuestRecomendations";

const Player = () => {
  const { username } = useParams();

  return (
    <>
      <div className="grid grid-cols-10 grid-rows-[100px_minmax(200px,_auto)] px-8 gap-4">
        <div className="col-start-1 col-end-11 row-start-1 row-end-2 border-secondary border rounded-md">
          {username && (
            <div>
              <h2 className="scroll-m-20 border-b p-2 text-3xl font-semibold tracking-tight first:mt-0">
                {username}
              </h2>
              <div className="flex flex-row gap-4 p-2">
                <p>1</p>
                <p>2</p>
                <p>3</p>
              </div>
            </div>
          )}
        </div>
        <div className="col-start-1 col-end-3 row-start-2 row-end-3 border-secondary border rounded-md">
          This will be quick links I think?
        </div>
        <div className="col-start-3 col-end-7 row-start-2 row-end-3 border-secondary border rounded-md">
          {username && <PlayerStatsTable username={username} />}
          {!username && (
            <div>
              <div>I haven't gotten this set up to display without any search params yet... rip.</div>
              <div>Try searching for a player! - GIMJoshJ will work!</div>
            </div>
          )}
        </div>
        <div className="col-start-7 col-end-11 row-start-2 row-end-3 border-secondary border rounded-md">
          <QuestRecomendations />
        </div>
      </div>
    </>
  );
};

export default Player;
