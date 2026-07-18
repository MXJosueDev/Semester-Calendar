import type { ImageMetadata } from "astro";
import Slot from "../Slot";

interface MilestoneSlotProps {
  image?: string | ImageMetadata;
  completedImage?: string | ImageMetadata;
  completed?: boolean;
  milestone: string;
}

const MilestoneSlot = ({ image, completedImage, completed, milestone }: MilestoneSlotProps) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-0.5 min-w-0">
      <Slot image={image} completedImage={completedImage} completed={completed} />

      <p className="milestone-text">{milestone}</p>
    </div>
  );
};

export default MilestoneSlot;
