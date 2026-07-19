const semesterData = {
  semester: "2026-2",
  startDate: "2026-07-27T06:00:00Z",
  endDate: "2026-12-04T06:00:00Z",
  // startDate: "2026-07-06",
  // endDate: "2026-11-13",
  milestones: [
    {
      milestoneId: 1,
      milestoneSlot: "helmet",
      milestone: "1 Parcial",
      item_texture: "milestones/diamond_helmet.png",
      slot_texture: "inventory/helmet.png",
      unlockWeek: 6,
      tooltipTitle: "1 Parcial",
      milestoneColor: "&a",
    },
    {
      milestoneId: 2,
      milestoneSlot: "boots",
      milestone: "2 Parcial",
      item_texture: "milestones/diamond_boots.png",
      slot_texture: "inventory/boots.png",
      unlockWeek: 12,
      tooltipTitle: "2 Parcial",
      milestoneColor: "&9",
    },
    {
      milestoneId: 3,
      milestoneSlot: "leggings",
      milestone: "3 Parcial",
      item_texture: "milestones/diamond_leggings.png",
      slot_texture: "inventory/leggings.png",
      unlockWeek: 18,
      tooltipTitle: "3 Parcial",
      milestoneColor: "&6",
    },
    {
      milestoneId: 4,
      milestoneSlot: "chestplate",
      milestone: "Finals",
      item_texture: "milestones/diamond_chestplate.png",
      slot_texture: "inventory/chestplate.png",
      unlockWeek: 19,
      tooltipTitle: "Finals",
      milestoneColor: "&d",
    },
  ],
  weeks: [
    {
      item_texture: "weeks/crafting_table.png",
      weekType: "Initial",
      weekColor: "&e",
    },
    {
      item_texture: "weeks/bread.png",
      weekType: "Normal",
      weekColor: "&f",
    },
    {
      item_texture: "weeks/heart.png",
      weekType: "<3 Normal",
      weekColor: "&c",
    },
    {
      item_texture: "weeks/bread.png",
      weekType: "Normal",
      weekColor: "&f",
    },
    {
      item_texture: "weeks/enchanted_book.gif",
      weekType: "Study",
      weekColor: "&5",
    },
    {
      item_texture: "weeks/wooden_sword.png",
      weekType: "Exams",
      weekColor: "&6",
    },
    {
      item_texture: "weeks/bread.png",
      weekType: "Normal",
      weekColor: "&f",
    },
    {
      item_texture: "weeks/bed.png",
      weekType: "Rest",
      weekColor: "&e",
    },
    {
      item_texture: "weeks/bread.png",
      weekType: "Normal",
      weekColor: "&f",
    },
    {
      item_texture: "weeks/bread.png",
      weekType: "Normal",
      weekColor: "&f",
    },
    {
      item_texture: "weeks/enchanted_book.gif",
      weekType: "Study",
      weekColor: "&5",
    },
    {
      item_texture: "weeks/iron_sword.png",
      weekType: "Exams",
      weekColor: "&6",
    },
    {
      item_texture: "weeks/bread.png",
      weekType: "Normal",
      weekColor: "&f",
    },
    {
      item_texture: "weeks/bread.png",
      weekType: "Normal",
      weekColor: "&f",
    },
    {
      item_texture: "weeks/bed.png",
      weekType: "Rest",
      weekColor: "&e",
    },
    {
      item_texture: "weeks/bread.png",
      weekType: "Normal",
      weekColor: "&f",
    },
    {
      item_texture: "weeks/enchanted_book.gif",
      weekType: "Study/Rest",
      weekColor: "&5",
    },
    {
      item_texture: "weeks/diamond_sword.png",
      weekType: "Exams",
      weekColor: "&6",
    },
    {
      item_texture: "weeks/dragon_egg.png",
      weekType: "Final",
      weekColor: "&d",
    },
  ],
} as SemesterData;

export default semesterData;
