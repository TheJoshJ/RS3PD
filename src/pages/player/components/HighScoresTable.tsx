import { getHighScores, HighScores } from "@/hooks/getHighScores";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HighScoresTable = () => {
  const { data: highScores } = getHighScores();

  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const toggleRow = (index: number) => {
    setExpandedRows(
      (prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index) // Retract if already expanded
          : [...prev, index] // Expand if not in the array
    );
  };

  return (
    <>
      <p className="text-3xl">High Scores</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rank</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Score</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {highScores?.map((player: HighScores, index) => {
            return (
              <>
                <TableRow>
                  <TableCell>{player.rank}</TableCell>
                  <TableCell>{player.name}</TableCell>
                  <TableCell>{player.score}</TableCell>
                  <TableCell>
                    <Button variant={"ghost"} onClick={() => toggleRow(index)}>
                      {expandedRows.includes(index) ? (
                        <ChevronDown />
                      ) : (
                        <ChevronRight />
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
                {expandedRows.includes(index) ? (
                  <TableRow>
                    <div>This will eventually show {player.name}'s stats</div>
                  </TableRow>
                ) : null}
              </>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default HighScoresTable;
