import { useState, useEffect } from "react";

interface Task {
  id: number;
  event: string;
  description: string;
  moreInfo?: string;
  checkboxes?: number;
}

interface TaskStorageProps {
  tasks: Task[];
  resetSchedule: "daily" | "weekly" | "monthly";
  resetDay?: number; // (0 = Sunday, 1 = Monday, etc.) For weekly resets
  resetDate?: number; // (1-31) For monthly resets
}

const useTaskStorage = ({ tasks, resetSchedule, resetDay, resetDate }: TaskStorageProps) => {
  // Generate a unique storage key based on reset schedule
  const storageKey = (() => {
    if (resetSchedule === "daily") return "daily_tasks";
    if (resetSchedule === "weekly" && resetDay !== undefined) return `weekly_tasks_${resetDay}`;
    if (resetSchedule === "monthly" && resetDate !== undefined) return `monthly_tasks_${resetDate}`;
    return "tasks";
  })();

  // Load stored checkbox state from localStorage
  const [checkStatus, setCheckStatus] = useState<Record<number, boolean[]>>(() => {
    const storedData = localStorage.getItem(storageKey);
    return storedData ? JSON.parse(storedData) : {};
  });

  // Save checkbox state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(checkStatus));
  }, [checkStatus, storageKey]);

  // Calculate next reset time dynamically
  const getNextResetTime = () => {
    const now = new Date();

    if (resetSchedule === "daily") {
      now.setUTCDate(now.getUTCDate() + 1);
      now.setUTCHours(0, 0, 0, 0);
    } else if (resetSchedule === "weekly" && resetDay !== undefined) {
      const daysUntilReset = (resetDay - now.getUTCDay() + 7) % 7 || 7;
      now.setUTCDate(now.getUTCDate() + daysUntilReset);
      now.setUTCHours(0, 0, 0, 0);
    } else if (resetSchedule === "monthly" && resetDate !== undefined) {
      now.setUTCMonth(now.getUTCMonth() + (now.getUTCDate() > resetDate ? 1 : 0));
      now.setUTCDate(resetDate);
      now.setUTCHours(0, 0, 0, 0);
    }

    return now.getTime();
  };

  // Reset checkboxes at the correct reset time
  useEffect(() => {
    const nextResetTime = getNextResetTime();
    const timeUntilReset = nextResetTime - Date.now();

    const resetTimeout = setTimeout(() => {
      setCheckStatus({});
      localStorage.setItem(storageKey, JSON.stringify({}));
    }, timeUntilReset);

    return () => clearTimeout(resetTimeout);
  }, [storageKey]);

  // Toggle checkbox state
  const toggleCheckbox = (taskId: number, index: number) => {
    setCheckStatus((prev) => {
      const newStatus = { ...prev };

      if (!newStatus[taskId]) {
        newStatus[taskId] = new Array(tasks.find((t) => t.id === taskId)?.checkboxes || 1).fill(false);
      }

      newStatus[taskId] = [...newStatus[taskId]];
      newStatus[taskId][index] = !newStatus[taskId][index];

      return newStatus;
    });
  };

  return { checkStatus, toggleCheckbox };
};

export default useTaskStorage;
