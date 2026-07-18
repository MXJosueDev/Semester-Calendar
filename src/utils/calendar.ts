import semesterData from "@/data/semester";

const getSemesterData = (): SemesterData => {
  const startDate = new Date(semesterData.startDate);
  const endDate = new Date(semesterData.endDate);

  const expectedWeeks = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 7)
  );

  if (semesterData.weeks.length !== expectedWeeks) {
    throw new Error(
      `The number of weeks in the semester data (${semesterData.weeks.length}) does not match the expected number of weeks (${expectedWeeks}).`
    );
  }

  return semesterData as SemesterData;
};

export const getSemester = (): string => {
  const data = getSemesterData();

  return data.semester
}

export const getElapsedWeeks = (): number => {
  const data = getSemesterData();
  const startDate = new Date(data.startDate);
  const currentDate = new Date();

  if(startDate > currentDate) return 0;

  const diffTime = Math.abs(currentDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const elapsedWeeks = Math.floor(diffDays / 7);

  return elapsedWeeks;

};

export const getWeeks = (): WeekData[] => {
  const data = getSemesterData();

  return data.weeks;
};

export const getMilestones = (): MilestonesData[] => {
  const data = getSemesterData();

  return data.milestones;
};

export const isWeekCompleted = (week: WeekData): boolean => {
  const weeks = getWeeks();
  const weekIndex = weeks.indexOf(week);

  if (getElapsedWeeks() > weekIndex) {
    return true;
  }

  return false;
};

export const isMilestoneCompleted = (milestoneId: number): boolean => {
  const weeks = getWeeks();
  const milestoneWeek = weeks.find(week => week.milestoneId === milestoneId);

  if (!milestoneWeek) {
    return false;
  }

  return isWeekCompleted(milestoneWeek);
};
