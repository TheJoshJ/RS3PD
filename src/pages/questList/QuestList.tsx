import { useParams } from "react-router";

function QuestList() {
  const { username } = useParams();
  return (
    <div className="flex flex-col items-center gap-5 h-auto w-screen">
      <p className="text-3xl">Welcome to the Quest List page, Partner! 🤠</p>
      {username ? (
        <p className="p">
          <b>{username}</b> seems to be long gone
        </p>
      ) : null}
    </div>
  );
}

export default QuestList;
