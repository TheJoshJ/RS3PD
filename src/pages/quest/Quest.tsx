import { useParams } from "react-router";

function Quest() {
  const { quest } = useParams();
  return (
    <div className="flex flex-col items-center gap-5 h-auto w-screen">
      <p className="text-3xl">
        Welcome to the Quests Details page, Partner! 🤠
      </p>
      <p>Judging by the URL, it looks like you're here for the {quest} Quest</p>
    </div>
  );
}

export default Quest;
