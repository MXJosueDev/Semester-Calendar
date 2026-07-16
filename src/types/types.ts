interface SemesterData {
  semester: string;
  startDate: string;
  endDate: string;
  milestones: [MilestonesData, MilestonesData, MilestonesData, MilestonesData];
  weeks: WeekData[];
}

interface MilestonesData {
  milestoneId: number;
  milestone: string;
  item_texture: string;
  slot_texture: string;
}

interface WeekData {
  item_texture: string;
  milestoneId?: number;
}
