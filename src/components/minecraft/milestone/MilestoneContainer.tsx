import { getTextureURL } from "@/utils/resources";
import MilestoneSlot from "./MilestoneSlot";

import { getMilestones, isMilestoneCompleted } from "@/utils/calendar.ts";
import useCalendar from "@/hooks/useCalendar";


const MilestoneContainer = () => {
  const calendar = useCalendar();

  const milestones = getMilestones();

  return (
    <div className="flex flex-col">
      <p className="container-text">Milestone</p>

      <div className="flex flex-row md:flex-col gap-x-3 gap-y-1">
        {milestones.map(milestone => {
          const isCompleted = isMilestoneCompleted(milestone.milestoneId);

          return (
            <MilestoneSlot
              milestone={milestone.milestone}
              image={getTextureURL(milestone.item_texture)}
              completedImage={getTextureURL("ui/checkmark.png")}
              completed={isCompleted}
              key={milestone.milestoneId}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MilestoneContainer;
