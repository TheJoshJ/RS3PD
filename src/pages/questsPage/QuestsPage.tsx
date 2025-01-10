import { useParams, useSearchParams } from "react-router";
import { ScrollArea } from "@/components/ui/scroll-area";
import QuestTable from "./components/QuestTable";
import { QuestDetails } from "./components/QuestDetails";
import { useEffect, useMemo } from "react";
import questData from "@/utils/quests.json";
import { getPlayerData } from "@/hooks/getPlayerData";
import { useToast } from "@/hooks/use-toast";

interface QuestSkillReq {
  skill: string;
  level: number;
}

interface QuestRequirements {
  quest: string[];
  skill: QuestSkillReq[];
}

interface QuestData {
  name: string;
  difficulty: number;
  members: boolean;
  questPoints: number;
  requirements: QuestRequirements;
}

const buildQuestTree = (
  questName: string,
  questMap: Record<string, QuestData>
): any => {
  const quest = questMap[questName];

  if (!quest) {
    return {
      name: questName,
      difficulty: 0,
      members: false,
      questPoints: 0,
      requirements: { quest: [], skill: [] },
    };
  }

  return {
    ...quest,
    requirements: {
      skill: quest.requirements.skill,
      quest: quest.requirements.quest.map((childQuestName) =>
        buildQuestTree(childQuestName, questMap)
      ),
    },
  };
};

const QuestsPage = () => {
  const { quest } = useParams();
  const [searchParams] = useSearchParams();
  const username = searchParams.get("user") || "";
  const { data: playerData } = getPlayerData(username, true);

  const { toast } = useToast();

  const showToast = (message: string) => {
    toast({
      title: "Unable to load profile data",
      description: message,
      duration: 3000,
      variant: "default",
    });
  };

  useEffect(() => {
    if (playerData?.error){
      showToast
    }
  },[playerData])

  const questMap = useMemo(() => {
    return questData.Quests.reduce((acc: Record<string, QuestData>, quest) => {
      acc[quest.name] = quest;
      return acc;
    }, {});
  }, []);

  // Resolve the quest tree for all top-level quests
  const resolvedQuests = useMemo(() => {
    return questData.Quests.map((quest) =>
      buildQuestTree(quest.name, questMap)
    );
  }, [questMap]);

  const selectdQuestData = resolvedQuests.find(
    (resolvedQuest) => resolvedQuest.name.toLowerCase() === quest?.toLowerCase()
  );

  return (
    <div className="grid grid-cols-3 gap-4 px-8 h-[calc(100vh-100px)]">
      {/* Left Section: Quest Table */}
      <ScrollArea className="col-span-1 border border-secondary rounded-md">
        <QuestTable filter={true} />
      </ScrollArea>

      {/* Right Section: Last Column */}
      <div className="col-span-2 border border-secondary rounded-md px-4">
        {quest && (
          <QuestDetails playerData={playerData?.error ? undefined : playerData} questData={selectdQuestData} />
        )}
        {!quest && <p className="pt-2">No Quest Selected</p>}
      </div>
    </div>
  );
};

export default QuestsPage;
