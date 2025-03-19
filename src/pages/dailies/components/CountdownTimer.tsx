import React, { useState, useEffect } from "react";
import cronParser from "cron-parser";

interface CountdownTimerProps {
  cronExpression: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ cronExpression }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  // Function to calculate the next reset time from cron
  const getNextResetTime = () => {
    try {
      const interval = cronParser.parse(cronExpression, { tz: "UTC" });
      return interval.next().getTime(); // Get the next reset timestamp
    } catch (error) {
      console.error("Invalid cron expression:", error);
      return Date.now(); // Default to now if invalid
    }
  };

  useEffect(() => {
    // Set initial countdown
    const nextResetTime = getNextResetTime();
    setTimeLeft(Math.max(0, Math.floor((nextResetTime - Date.now()) / 1000)));

    // Update the countdown every second
    const interval = setInterval(() => {
      const remaining = Math.max(
        0,
        Math.floor((nextResetTime - Date.now()) / 1000)
      );
      setTimeLeft(remaining);

      if (remaining <= 0) {
        // Reset timer
        const newResetTime = getNextResetTime();
        setTimeLeft(
          Math.max(0, Math.floor((newResetTime - Date.now()) / 1000))
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [cronExpression]);

  // Format time including days
  const formatTime = (seconds: number) => {
    const days = Math.floor(seconds / 86400); // 86400 seconds in a day
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (days > 0) {
      return `${days}d ${String(hours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    } else {
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
      )}:${String(secs).padStart(2, "0")}`;
    }
  };

  return <div className="text-xl font-bold">{formatTime(timeLeft)}</div>;
};

export default CountdownTimer;
