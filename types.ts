
export interface GroceryItem {
  id: string;
  name: string;
}

export interface TaskItem {
  id: string;
  description: string;
}

export interface DailyPlan {
  dayId: string; // e.g., "day1"
  dayTitle: string; // e.g., "LUNDI - JOUR 1"
  tasks: TaskItem[]; // Should always be 5 tasks: 1 hydration, 4 meals/snacks
}

// Represents the checked state of grocery items
export type GroceryCheckedState = Record<string, boolean>;

// Represents the completion state of tasks for each day
// Outer key is dayId (e.g., "day1"), inner array is boolean per task
export type DailyProgressState = Record<string, boolean[]>;
