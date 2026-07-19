import useCalendar from "@/hooks/useCalendar";
import Player from "../Player";
import Slot from "../Slot";

import { getMilestones, isMilestoneCompleted } from "@/utils/calendar.ts";
import { getTextureURL } from "@/utils/resources";

const MILESTONE_ARMOR_ORDER = ["helmet", "chestplate", "leggings", "boots"];

const PlayerContainer = () => {
  const calendar = useCalendar();

  const milestones = getMilestones();

  const orderedMilestones = MILESTONE_ARMOR_ORDER.map(slot => milestones.find(milestone => milestone.milestoneSlot === slot)).filter(milestone => milestone !== undefined);

  return (
    <div>
      <p className="container-text">Student</p>

      <div className="flex">
        <div>
          {orderedMilestones.map(milestone => {
            const isCompleted = isMilestoneCompleted(milestone.milestoneId);
            const image = isCompleted
              ? getTextureURL(milestone.item_texture)
              : getTextureURL(milestone.slot_texture);

            return <Slot image={image} key={milestone.milestoneId} />;
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
