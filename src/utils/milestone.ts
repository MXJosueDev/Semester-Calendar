import { getMilestones, isMilestoneCompleted } from "./calendar";

export const isMilestoneCompletedBySlot = (milestoneSlot: string): boolean => {
  const milestones = getMilestones();
  const milestone = milestones.find(m => m.milestoneSlot === milestoneSlot);

  if (!milestone) return false;

  return isMilestoneCompleted(milestone.milestoneId);
};
