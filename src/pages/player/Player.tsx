import { useParams } from "react-router";

function Player() {
  const { username } = useParams();
  return (
    <div className="flex flex-col items-center gap-5 h-auto w-screen">
      <p className="text-3xl">Welcome to the Player page, Partner! 🤠</p>
      {username ? (
        <p className="p">
          I haven't seen <b>{username}</b> in these parts for a while
        </p>
      ) : null}
    </div>
  );
}

export default Player;
