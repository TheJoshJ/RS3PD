import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronDown, ChevronRight } from "lucide-react";

interface QuestData {
  difficulty: number;
  members: boolean;
  questPoints: number;
  requirements: {
    quest: string[];
    skill: { skill: string; level: number }[];
  };
}

interface QuestCardProps {
  expanded: boolean;
  onToggle: () => void;
  index: number;
  questName: string; // newly added prop
  questData: QuestData; // newly added prop
}

export const QuestCard = ({
  expanded,
  onToggle,
  questName,
  questData,
}: QuestCardProps) => {
  const getRandomPriority = (): string => {
    const priorities = ["Low", "Medium", "High", "Urgent"];
    const randomIndex = Math.floor(Math.random() * priorities.length);
    return priorities[randomIndex];
  };

  console.log(questData);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-row justify-between items-center">
          <CardTitle>{questName}</CardTitle>
          <Button variant="outline" onClick={onToggle}>
            {expanded ? <ChevronDown /> : <ChevronRight />}
          </Button>
        </div>
      </CardHeader>
      {expanded && (
        <CardContent>
          <div className="flex flex-row justify-between px-6">
            {/* Skill Requirements */}
            <div className="flex flex-col w-[40%]">
              <p className="font-bold border-b">Skill Requirements</p>
              {questData.requirements.skill.length > 0 ? (
                questData.requirements.skill.map((skillReq, index) => (
                  <p key={index}>
                    {skillReq.level}{" "}
                    {skillReq.skill.charAt(0).toUpperCase() +
                      skillReq.skill.slice(1)}
                  </p>
                ))
              ) : (
                <p className="line-through text-muted-foreground">None</p>
              )}
            </div>

            {/* Quest Requirements */}
            <div className="flex flex-col w-[40%]">
              <p className="font-bold border-b">Quest Requirements</p>
              {questData.requirements.quest.length > 0 ? (
                questData.requirements.quest.map((quest, index) => (
                  <p key={index}>{quest}</p>
                ))
              ) : (
                <p className="line-through text-muted-foreground">None</p>
              )}
            </div>
          </div>
        </CardContent>
      )}
      <CardFooter className="flex gap-4 justify-between">
        Priority: {getRandomPriority() + "*"}
        <p className="text-secondary">*Randomly Generated Text</p>
      </CardFooter>
    </Card>
  );
};
