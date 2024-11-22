import { useParams } from "react-router";

function QuestList() {
  const { username } = useParams();
  return (
    <div className="flex flex-col gap-5 h-auto">
      <p className="text-3xl">Welcome to the Quest List page, Partner! 🤠</p>
      {username ?? <p className="text-2xl">{username}</p>}
    </div>
  );
}

export default QuestList;
