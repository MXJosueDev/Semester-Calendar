import { useState, useEffect } from "react";
// Importa tus funciones desde el archivo donde las definiste
import { getElapsedWeeks } from "@/utils/calendar.ts";

const useCalendar = () => {
  const [elapsedWeeks, setElapsedWeeks] = useState<number>(getElapsedWeeks());

  useEffect(() => {
    const checkTimeProgress = () => {
      const currentElapsed = getElapsedWeeks();

      if (currentElapsed !== elapsedWeeks) {
        setElapsedWeeks(currentElapsed);
      }
    };

    const interval = setInterval(checkTimeProgress, 1000 * 60 * 1);

    return () => clearInterval(interval);
  }, [elapsedWeeks]);

  return elapsedWeeks;
};

export default useCalendar;
