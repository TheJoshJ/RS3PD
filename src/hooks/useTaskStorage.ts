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
  resetDay?: number;   // (for weekly resets; 0 = Sunday, 1 = Monday, etc.)
  resetDate?: number;  // (for monthly resets; 1-31)
}

const useTaskStorage = ({ tasks, resetSchedule, resetDay, resetDate }: TaskStorageProps) => {
  // Generate a storage key for the current category
  const storageKey = (() => {
    if (resetSchedule === "daily") return "daily_tasks";
    if (resetSchedule === "weekly" && resetDay !== undefined) return `weekly_tasks_${resetDay}`;
    if (resetSchedule === "monthly" && resetDate !== undefined) return `monthly_tasks_${resetDate}`;
    return "tasks";
  })();
  
  // Global key for tracking last update times
  const lastUpdatedKey = "lastUpdated";
  // For organizing last-updated times by category, remove the "_tasks" suffix:
  const categoryKey = storageKey.replace("_tasks", "");

  // Helper: update the last-updated object stored in localStorage
  const updateLastUpdated = (timestamp: number) => {
    const stored = localStorage.getItem(lastUpdatedKey);
    const lu = stored ? JSON.parse(stored) : {};
    const updated = { ...lu, [categoryKey]: timestamp };
    localStorage.setItem(lastUpdatedKey, JSON.stringify(updated));
  };

  // Helper: retrieve the last-updated object from localStorage
  const getLastUpdated = (): Record<string, number> => {
    const stored = localStorage.getItem(lastUpdatedKey);
    return stored ? JSON.parse(stored) : {};
  };

  // Load our checkbox state from localStorage (or start with an empty object)
  const [checkStatus, setCheckStatus] = useState<Record<number, boolean[]>>(() => {
    const stored = localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : {};
  });

  // Compute the upcoming reset time in UTC.
  // For example, for daily tasks, this will be tomorrow at 00:00 UTC.
  const getUpcomingResetTime = (): number => {
    const now = new Date();
    if (resetSchedule === "daily") {
      now.setUTCHours(0, 0, 0, 0);
      now.setUTCDate(now.getUTCDate() + 1);
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

  // On mount, check if we missed a reset:
  // Only perform a reset if there is a last update timestamp for this category (i.e. the user has interacted before)
  // and the current time is past the upcoming reset time.
  useEffect(() => {
    const nextResetTime = getUpcomingResetTime();
    const lu = getLastUpdated()[categoryKey];
    if (lu && Date.now() >= nextResetTime) {
      console.log(`Resetting tasks for ${categoryKey} due to missed reset.`);
      setCheckStatus({});
      localStorage.setItem(storageKey, JSON.stringify({}));
      updateLastUpdated(Date.now());
    }
  }, [storageKey, categoryKey]);

  // Save our checkbox state whenever it changes,
  // and update the last-updated timestamp for this category.
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(checkStatus));
    updateLastUpdated(Date.now());
  }, [checkStatus, storageKey]);

  // Schedule the next reset based on the upcoming reset time.
  useEffect(() => {
    const nextResetTime = getUpcomingResetTime();
    const timeUntilReset = nextResetTime - Date.now();
    console.log(`Next reset for ${storageKey} scheduled in ${timeUntilReset / 1000}s`);
    const timeoutId = setTimeout(() => {
      console.log(`Resetting tasks for ${storageKey} at scheduled time.`);
      setCheckStatus({});
      localStorage.setItem(storageKey, JSON.stringify({}));
      updateLastUpdated(Date.now());
    }, timeUntilReset);
    return () => clearTimeout(timeoutId);
  }, [storageKey]);

  // Toggle a specific checkbox
  const toggleCheckbox = (taskId: number, index: number) => {
    setCheckStatus((prev) => {
      const newStatus = { ...prev };
      if (!newStatus[taskId]) {
        // Initialize with the appropriate number of checkboxes
        newStatus[taskId] = new Array(tasks.find(t => t.id === taskId)?.checkboxes || 1).fill(false);
      }
      newStatus[taskId] = [...newStatus[taskId]]; // Create a copy of the array
      newStatus[taskId][index] = !newStatus[taskId][index];
      return newStatus;
    });
  };

  return { checkStatus, toggleCheckbox };
};

export default useTaskStorage;
