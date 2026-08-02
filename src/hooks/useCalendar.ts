import { useState, useEffect } from "react";
import { getElapsedWeeks } from "@/utils/calendar.ts";
import usePageVisibility from "./usePageVisibility";

const useCalendar = () => {
  const [elapsedWeeks, setElapsedWeeks] = useState<number>(getElapsedWeeks());
  const isPageVisible = usePageVisibility();

  useEffect(() => {
    if (!isPageVisible) {
      return;
    }

    const checkTimeProgress = () => {
      const currentElapsed = getElapsedWeeks();

      setElapsedWeeks(previousElapsed =>
        previousElapsed === currentElapsed ? previousElapsed : currentElapsed
      );
    };

    const interval = setInterval(checkTimeProgress, 1000 * 60 * 1);

    return () => clearInterval(interval);
  }, [isPageVisible]);

  return elapsedWeeks;
};

export default useCalendar;
