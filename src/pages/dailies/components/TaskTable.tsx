import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import useTaskStorage from "@/hooks/useTaskStorage";
import { useState } from "react";

interface Task {
  id: number;
  event: string;
  description: string;
  moreInfo?: string;
  checkboxes?: number;
}

interface TaskTableProps {
  tasks: Task[];
  resetSchedule: "daily" | "weekly" | "monthly";
  resetDay?: number; // 0 = Sunday, 1 = Monday, etc. (for weekly resets)
  resetDate?: number; // 1-31 (for monthly resets)
}

const TaskTable = ({
  tasks,
  resetSchedule,
  resetDay,
  resetDate,
}: TaskTableProps) => {
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});

  const { checkStatus, toggleCheckbox } = useTaskStorage({
    tasks,
    resetSchedule,
    resetDay,
    resetDate,
  });

  // Toggle expand/collapse
  const toggleRow = (taskId: number) => {
    setExpandedRows((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[250px]">Event</TableHead>
          <TableHead className="w-[50px]">Completed</TableHead>
          <TableHead className="w-[300px]">Description</TableHead>
          <TableHead className="w-[50px]">More</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => {
          const isExpanded = !!expandedRows[task.id];
          return (
            <>
              <TableRow key={task.id} onClick={() => toggleRow(task.id)}>
                <TableCell>{task.event}</TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <div className="flex gap-2">
                    {[...Array(task.checkboxes || 1)].map((_, index) => (
                      <Checkbox
                        key={index}
                        className="h-5 w-5"
                        checked={checkStatus[task.id]?.[index] || false}
                        onCheckedChange={() => toggleCheckbox(task.id, index)}
                      />
                    ))}
                  </div>
                </TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>
                  <div className="flex flex-row">
                    {isExpanded ? (
                      <ChevronDown className="border rounded" />
                    ) : (
                      <ChevronRight className="border rounded" />
                    )}
                  </div>
                </TableCell>
              </TableRow>
              {isExpanded && (
                <TableRow>
                  <TableCell colSpan={4}>
                    <p>{task.moreInfo || "More details coming soon..."}</p>
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

export default TaskTable;
