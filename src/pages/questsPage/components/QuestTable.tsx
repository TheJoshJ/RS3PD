import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EllipsisIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import questData from "@/utils/quests.json";
import { useLocation, useNavigate } from "react-router";

interface QuestTableProps {
  filter?: boolean;
}

const CRUMBS_STORAGE_KEY = "RS3PD_v1_crumbs";

const QuestTable = ({ filter }: QuestTableProps) => {
  const [searchVal, setSearchVal] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();

  const navWithParams = (dest: string) => {
    const currentParams = location.search; // Get the current query parameters
    navigate(`${dest}${currentParams}`); // Append them to the new path
  };

  const fuse = useMemo(() => {
    return new Fuse(questData.Quests, {
      keys: ["name"],
      threshold: 0.3,
      minMatchCharLength: 2,
    });
  }, [questData]);

  const filteredQuests = useMemo(() => {
    const questsArray = questData.Quests;
    const filteredBySearch = searchVal.trim()
      ? fuse.search(searchVal).map((result) => result.item)
      : questsArray;

    return filteredBySearch;
  }, [searchVal, fuse, questData.Quests]);

  const resetCrumbs = () => {
    localStorage.setItem(CRUMBS_STORAGE_KEY, JSON.stringify([]));
  };

  const handleDisplayData = (quest: string) => {
    navWithParams(`/quests/${quest.toLowerCase()}`);
    resetCrumbs();
  };

  return (
    <>
      {filter && (
        <div className="flex flex-row justify-between items-center px-4 py-2 border-b gap-2">
          <div className="h-[80%} ">
            <Input
              placeholder="Quest Name"
              value={searchVal}
              onChange={(e) => setSearchVal(e.currentTarget.value)}
            />
          </div>
        </div>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Name</TableHead>
            <TableHead className="w-[20px]">Points</TableHead>
            <TableHead className="w-[50px]">More</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {questData.Quests.map((quest) => {
            const isVisible = filteredQuests.some(
              (filteredQuest) =>
                filteredQuest.name.toLowerCase() === quest.name.toLowerCase()
            );

            return (
              <TableRow
                hidden={!isVisible}
                key={quest.name}
                onClick={() => handleDisplayData(quest.name)}
              >
                <TableCell>
                  <span>{quest.name}</span>
                </TableCell>
                <TableCell>{quest.questPoints}</TableCell>
                <TableCell>
                  <EllipsisIcon />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default QuestTable;
