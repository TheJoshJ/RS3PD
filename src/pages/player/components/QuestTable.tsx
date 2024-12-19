import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlayerData } from "@/hooks/getPlayerData";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { CheckIcon, EllipsisIcon, LinkIcon, XIcon } from "lucide-react";
import { useNavigate } from "react-router";

interface PlayerStatsTableProps {
  playerData: PlayerData | undefined;
  loading: boolean;
}

const PlayerStatsTable = ({ playerData, loading }: PlayerStatsTableProps) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[20px]">Complete</TableHead>
            <TableHead className="w-[300px]">Name</TableHead>
            <TableHead className="w-[20px]">Points</TableHead>
            <TableHead className="w-[50px]">Link</TableHead>
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
                  <LinkIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  if (!playerData || (!playerData.skillvalues && !loading)) {
    return <div>No data available</div>;
  }

  const quests = playerData.quests;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[20px]">Complete</TableHead>
          <TableHead className="w-[300px]">Name</TableHead>
          <TableHead className="w-[20px]">Points</TableHead>
          <TableHead className="w-[50px]">Link</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {quests.map((quest) => {
          return (
            <>
              <TableRow key={quest.title}>
                <TableCell>
                  <div className="flex flex-row ">
                    {(quest.status === "COMPLETED" && (
                      <CheckIcon color="green" />
                    )) || <XIcon color="red" />}
                  </div>
                </TableCell>
                <TableCell>
                  <span>{quest.title}</span>
                </TableCell>
                <TableCell>{quest.questPoints}</TableCell>
                <TableCell>
                  <EllipsisIcon
                    onClick={() => {
                      navigate(
                        `/quest/${quest.title}?username=${playerData.name}`
                      );
                    }}
                  />
                </TableCell>
              </TableRow>
            </>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default PlayerStatsTable;
