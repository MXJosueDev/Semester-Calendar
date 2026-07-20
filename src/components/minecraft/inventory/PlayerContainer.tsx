import useCalendar from "@/hooks/useCalendar";
import Player from "../player/Player";
import Slot from "../Slot";

import { getMilestones, isMilestoneCompleted } from "@/utils/calendar.ts";
import { getTextureURL } from "@/utils/resources";
import { useEffect, useState } from "react";

const MILESTONE_ARMOR_ORDER = ["helmet", "chestplate", "leggings", "boots"];

const PlayerContainer = () => {
  const calendar = useCalendar();
  const [orderedMilestones, setOrderedMilestones] = useState<MilestonesData[]>([]);

  const milestones = getMilestones();

  useEffect(() => {
    const ordered = MILESTONE_ARMOR_ORDER.map(slot =>
      milestones.find(milestone => milestone.milestoneSlot === slot)
    ).filter(milestone => milestone !== undefined);

    setOrderedMilestones(ordered);
  }, [milestones]); // Ni si quiera sé porque hay que hacerlo con useEffect, pero si no los slots no se actualizan xd

  return (
    <div>
      <p className="container-text">Student</p>

      <div className="flex">
        <div>
          {orderedMilestones.length === 0 &&
            Array.from({ length: 4 }).map((_, index) => <Slot key={index} />)}
            
          {orderedMilestones.map(milestone => {
            const isCompleted = isMilestoneCompleted(milestone.milestoneId);

            return isCompleted ? (
              <Slot image={getTextureURL(milestone.item_texture)} key={milestone.milestoneId} />
            ) : (
              <Slot image={getTextureURL(milestone.slot_texture)} key={milestone.milestoneId} />
            );
          })}
        </div>
        <div>
          <Player />
        </div>
      </div>
    </div>
  );
};

export default PlayerContainer;
