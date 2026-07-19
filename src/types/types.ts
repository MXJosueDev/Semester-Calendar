interface SemesterData {
  semester: string;
  startDate: string;
  endDate: string;
  milestones: [MilestonesData, MilestonesData, MilestonesData, MilestonesData];
  weeks: WeekData[];
}

interface MilestonesData {
  milestoneId: number;
  milestoneSlot: string;
  milestone: string;
  unlockWeek: number;
  item_texture: string;
  slot_texture: string;

  tooltipTitle: string;
  milestoneColor: string;
}

interface WeekData {
  item_texture: string;

  weekType: string;
  weekColor: string;
}
