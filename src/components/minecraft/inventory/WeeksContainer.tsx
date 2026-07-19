import { getTextureURL } from "@/utils/resources";
import Slot from "../Slot";
import { getElapsedWeeks, getWeeks, getWeeksTo, getWeekStartDate, getWeekEndDate } from "@/utils/calendar.ts";
import useCalendar from "@/hooks/useCalendar";
import Tooltip from "../Tooltip";

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
            <Tooltip
              tooltipTitle={`${week.weekColor}${week.weekType} Week`}
              text={`&7From: ${week.weekColor}${getWeekStartDate(week).toLocaleDateString()}\n&7To: ${week.weekColor}${getWeekEndDate(week).toLocaleDateString()}\n&7Weeks to: ${completed ? "&aCompleted" : `${week.weekColor}${getWeeksTo(week)}`}`}
              key={index + 1}
            >
              <Slot
                completed={completed}
                image={getTextureURL(week.item_texture)}
                completedImage={getTextureURL("ui/checkmark.png")}
                quantity={index + 1}
                key={index + 1}
              />
            </Tooltip>
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
