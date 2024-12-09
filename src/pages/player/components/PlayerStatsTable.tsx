import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getPlayerData } from "@/hooks/getPlayerData";
import { formatNumber } from "@/utils/formatNumber";
import { getSkillName } from "@/utils/getSkillName";
import { Skeleton } from "@/components/ui/skeleton";
import { getSkillImage } from "@/utils/getSkillImage";
import LevelBar from "./LevelBar";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { MonthlyExpChart } from "./MonthlyExpChart";

interface PlayerStatsTableProps {
  username: string | undefined;
}

const PlayerStatsTable = ({ username }: PlayerStatsTableProps) => {
  const {
    data: playerData,
    isLoading: isPlayerDataLoading,
    error: playerDataError,
  } = getPlayerData(username ?? "tall n manly");

  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});

  const toggleRow = (skillId: number) => {
    setExpandedRows((prev) => {
      // If expanded, close
      const newExpandedRows = { [skillId]: !prev[skillId] };
      return newExpandedRows;
    });
  };

  if (isPlayerDataLoading) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Skill</TableHead>
            <TableHead className="w-[100px]">Level</TableHead>
            <TableHead className="w-[100px]">Experience</TableHead>
            <TableHead className="w-[100px]">Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 24 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-5 w-[100%]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-[100%]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-[100%]" />
              </TableCell>
              <TableCell>
                <Button variant="outline">
                  <ChevronRight />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  if (playerDataError) {
    return <div>Error: {playerDataError.message}</div>;
  }

  if (!playerData || !playerData.skillvalues) {
    return <div>No data available</div>;
  }

  const sortedSkillValues = [...playerData.skillvalues].sort(
    (a, b) => a.id - b.id
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Skill</TableHead>
          <TableHead className="w-[100px]">Level</TableHead>
          <TableHead className="w-[100px]">Experience</TableHead>
          <TableHead className="w-[100px]">Details</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedSkillValues.map((skill) => {
          const isExpanded = !!expandedRows[skill.id];
          return (
            <>
              <TableRow key={skill.id}>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <img
                      src={getSkillImage(skill.id)}
                      alt={getSkillName(skill.id)}
                      className="h-6 w-6"
                    />
                    <span>{getSkillName(skill.id)}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-row gap-2">
                    <div className="w-5">{skill.level}</div>
                    <LevelBar skill={skill} />
                  </div>
                </TableCell>
                <TableCell>
                  {skill.level >= 99
                    ? formatNumber(Math.round(skill.xp / 10))
                    : formatNumber(skill.xp)}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    onClick={() => {
                      toggleRow(skill.id);
                    }}
                  >
                    {isExpanded ? <ChevronDown /> : <ChevronRight />}
                  </Button>
                </TableCell>
              </TableRow>
              {isExpanded && (
                <TableRow>
                  <TableCell colSpan={4}>
                    <MonthlyExpChart
                      key={skill.id}
                      username={username || "tall n manly"}
                      skillId={skill.id}
                    />
                  </TableCell>
                </TableRow>
              )}
            </>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default PlayerStatsTable;
