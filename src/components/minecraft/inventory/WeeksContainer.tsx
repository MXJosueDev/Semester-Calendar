import { getTextureURL } from "@/utils/resources";
import Slot from "../Slot";
import { getElapsedWeeks, getWeeks } from "@/utils/calendar.ts";
import useCalendar from "@/hooks/useCalendar";

const SLOTS = 24;

const WeeksContainer = () => {
  const calendar = useCalendar();

  const weeks = getWeeks();
  
  return (
    <div>
      <p className="container-text">Weeks</p>

      <div className="grid grid-cols-6">
        {weeks.map((week, index) => {
          const elapsedWeeks = getElapsedWeeks();
          const completed = index < elapsedWeeks;

          return (
            <Slot
              completed={completed}
              image={getTextureURL(week.item_texture)}
              completedImage={getTextureURL("ui/checkmark.png")}
              quantity={index + 1}
              key={index + 1}
            />
          );
        })}

        {Array.from({ length: SLOTS - weeks.length }, (_, index) => {
          return <Slot key={index + weeks.length + 1} />;
        })}
      </div>
    </div>
  );
};

export default WeeksContainer;
