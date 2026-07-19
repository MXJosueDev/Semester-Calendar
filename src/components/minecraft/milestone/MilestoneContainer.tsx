import { getTextureURL } from "@/utils/resources";
import MilestoneSlot from "./MilestoneSlot";

import { getMilestones, isMilestoneCompleted, getElapsedWeeks } from "@/utils/calendar.ts";
import useCalendar from "@/hooks/useCalendar";
import Tooltip from "../Tooltip";

const MilestoneContainer = () => {
  const calendar = useCalendar();

  const milestones = getMilestones();

  return (
    <div className="flex flex-col">
      <p className="container-text">Milestone</p>

      <div className="flex flex-row md:flex-col gap-x-3 gap-y-1">
        {milestones.map(milestone => {
          const isCompleted = isMilestoneCompleted(milestone.milestoneId);
          const elapsedWeeks = getElapsedWeeks();

          return (
            <Tooltip tooltipTitle={`${milestone.milestoneColor}${milestone.tooltipTitle}`} text={`&7Unlocks on week: ${milestone.milestoneColor}${milestone.unlockWeek}\n&7Weeks to unlock: ${isCompleted ? "&aUnlocked!" : `${milestone.milestoneColor}${milestone.unlockWeek - elapsedWeeks}`}`} key={milestone.milestoneId}>
              <MilestoneSlot
                milestone={milestone.milestone}
                image={getTextureURL(milestone.item_texture)}
                completedImage={getTextureURL("ui/checkmark.png")}
                completed={isCompleted}
                key={milestone.milestoneId}
              />
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
};

export default MilestoneContainer;
