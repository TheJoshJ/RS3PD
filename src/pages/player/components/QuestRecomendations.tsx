import { useState } from "react";
import { QuestCard } from "./QuestCard";
import questData from "@/utils/shortQuests.json";

const QuestRecomendations = () => {
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});

  const toggleRow = (idx: number) => {
    setExpandedRows((prev) => {
      // If expanded, close
      const newExpandedRows = { [idx]: !prev[idx] };
      return newExpandedRows;
    });
  };

  const questsArray = Object.entries(questData.Quests);
  return (
    <div className="p-4">
      <h2 className="text-3xl pb-1 font-semibold">
        Quest Priority
      </h2>
      <div className="flex flex-col items-center gap-2">
        {questsArray.map(([questName, questData], idx) => (
          <QuestCard
            key={questName}
            index={idx}
            expanded={expandedRows[idx]}
            onToggle={() => toggleRow(idx)}
            questName={questName}
            questData={questData}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestRecomendations;
