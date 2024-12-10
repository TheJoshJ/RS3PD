import { xpTable } from "@/utils/xpTable";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { skillValues } from "@/hooks/getPlayerData";
import { formatNumber } from "@/utils/formatNumber";

interface LevelBarProps {
  skill: skillValues;
}

const LevelBar = ({ skill }: LevelBarProps) => {
  // Find the current level based on XP

  // For whatever reason, whenever you get to level 99 in a skill they start reporting the xp as 10x what it actually is so we have to constantly adjust for that
  const currentLevelData = xpTable
    .slice()
    .reverse()
    .find((data) => {
      const adjustedXp = skill.level >= 99 ? skill.xp / 10 : skill.xp;
      return adjustedXp >= data.xp;
    });

  const nextLevelData = xpTable.find(
    (data) => data.level === (currentLevelData?.level || 1) + 1
  );

  if (!currentLevelData) {
    return <div>Error</div>;
  }

  const progress = nextLevelData
    ? ((skill.level >= 99
        ? skill.xp / 10 - currentLevelData.xp
        : skill.xp - currentLevelData.xp) /
        (nextLevelData.xp - currentLevelData.xp)) *
      100
    : 100;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="w-full h-full p-0">
          <div className="relative h-4 w-full bg-secondary rounded">
            <div
              className="absolute h-full bg-chart-5 rounded"
              style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
            ></div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div>
            {nextLevelData && skill.level < 99
              ? formatNumber(nextLevelData.xp - skill.xp)
              : nextLevelData &&
                formatNumber(nextLevelData.xp - Math.round(skill.xp / 10))}
            xp to level {skill.level + 1}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default LevelBar;
