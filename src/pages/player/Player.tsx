import { useParams } from "react-router";

function Player() {
  const { username } = useParams();
  return (
    <div className="flex flex-col gap-5 h-auto">
      <p className="text-3xl">Welcome to the Player page, Partner! 🤠</p>
      <p className="text-2xl">{username}</p>
    </div>
  );
}

export default Player;
