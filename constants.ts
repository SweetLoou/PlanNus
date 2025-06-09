
import { GroceryItem, DailyPlan, TaskItem } from './types';

export const APP_NAME = "Nus à Gab dot com";
export const WEEK_NAME = "Semaine 1";

export const GROCERY_ITEMS: GroceryItem[] = [
  { id: 'yogurt', name: 'Yogourt grec nature' },
  { id: 'oats', name: 'Flocons d’avoine' },
  { id: 'blueberries', name: 'Bleuets (frais ou surgelés)' },
  { id: 'nutButter', name: 'Beurre de noix naturel' },
  { id: 'eggs', name: 'Œufs' },
  { id: 'tofu', name: 'Tofu ferme nature' },
  { id: 'chicken', name: 'Poitrine de poulet' },
  { id: 'brownRice', name: 'Riz brun' },
  { id: 'spinach', name: 'Épinards (frais ou surgelés)' },
  { id: 'salad', name: 'Salade verte (mélange au choix)' },
  { id: 'apples', name: 'Pommes' },
  { id: 'kfiSauce', name: 'Sauce KFI Poulet au beurre végétalien' },
];

const COMMON_HYDRATION_TASK: TaskItem = { id: 'water', description: 'Boire entre 2 et 3 litres d’eau' };

export const DAILY_PLANS_DATA: DailyPlan[] = [
  {
    dayId: 'day1',
    dayTitle: 'LUNDI - JOUR 1',
    tasks: [
      COMMON_HYDRATION_TASK,
      { id: 'd1_breakfast', description: 'DÉJEUNER : Yogourt grec nature + bleuets + beurre de noix naturel' },
      { id: 'd1_lunch', description: 'DÎNER : Omelette (œufs + épinards)' },
      { id: 'd1_snack', description: 'COLLATION : Pomme' },
      { id: 'd1_supper', description: 'SOUPER : Poitrine de poulet grillée + riz brun + épinards sautés' },
    ],
  },
  {
    dayId: 'day2',
    dayTitle: 'MARDI - JOUR 2',
    tasks: [
      COMMON_HYDRATION_TASK,
      { id: 'd2_breakfast', description: 'DÉJEUNER : Flocons d’avoine + bleuets + beurre de noix naturel' },
      { id: 'd2_lunch', description: 'DÎNER : Restes de poulet grillé + riz brun + salade verte' },
      { id: 'd2_snack', description: 'COLLATION : Pomme' },
      { id: 'd2_supper', description: 'SOUPER : Tofu ferme nature sauté + riz brun + épinards' },
    ],
  },
  {
    dayId: 'day3',
    dayTitle: 'MERCREDI - JOUR 3',
    tasks: [
      COMMON_HYDRATION_TASK,
      { id: 'd3_breakfast', description: 'DÉJEUNER : Yogourt grec nature + bleuets + beurre de noix naturel' },
      { id: 'd3_lunch', description: 'DÎNER : Salade verte copieuse avec des œufs durs et des morceaux de tofu' },
      { id: 'd3_snack', description: 'COLLATION : Pomme' },
      { id: 'd3_supper', description: 'SOUPER : Poulet au beurre (avec Sauce KFI Poulet au beurre végétalien) + riz brun + épinards' },
    ],
  },
  {
    dayId: 'day4',
    dayTitle: 'JEUDI - JOUR 4',
    tasks: [
      COMMON_HYDRATION_TASK,
      { id: 'd4_breakfast', description: 'DÉJEUNER : Flocons d’avoine + bleuets + beurre de noix naturel' },
      { id: 'd4_lunch', description: 'DÎNER : Restes de Poulet au beurre + riz brun' },
      { id: 'd4_snack', description: 'COLLATION : Pomme' },
      { id: 'd4_supper', description: 'SOUPER : Poitrine de poulet (cuite au four) + salade verte + quelques bleuets' },
    ],
  },
  {
    dayId: 'day5',
    dayTitle: 'VENDREDI - JOUR 5',
    tasks: [
      COMMON_HYDRATION_TASK,
      { id: 'd5_breakfast', description: 'DÉJEUNER : Yogourt grec nature + bleuets + beurre de noix naturel' },
      { id: 'd5_lunch', description: 'DÎNER : Omelette (œufs + épinards + restes de poulet si dispo)' },
      { id: 'd5_snack', description: 'COLLATION : Pomme' },
      { id: 'd5_supper', description: 'SOUPER : Tofu ferme nature grillé + riz brun + salade verte' },
    ],
  },
  {
    dayId: 'day6',
    dayTitle: 'SAMEDI - JOUR 6',
    tasks: [
      COMMON_HYDRATION_TASK,
      { id: 'd6_breakfast', description: 'DÉJEUNER : Flocons d’avoine + bleuets + beurre de noix naturel' },
      { id: 'd6_lunch', description: 'DÎNER : Grande salade verte avec poitrine de poulet en dés + pomme en dés' },
      { id: 'd6_snack', description: 'COLLATION : Yogourt grec nature' },
      { id: 'd6_supper', description: 'SOUPER : "Bowl" repas: Riz brun, épinards frais, tofu en dés, bleuets, filet de beurre de noix' },
    ],
  },
  {
    dayId: 'day7',
    dayTitle: 'DIMANCHE - JOUR 7',
    tasks: [
      COMMON_HYDRATION_TASK,
      { id: 'd7_breakfast', description: 'DÉJEUNER : Yogourt grec nature + bleuets + beurre de noix naturel' },
      { id: 'd7_lunch', description: 'DÎNER : Restes du souper de samedi (Bowl repas) ou œufs brouillés + épinards' },
      { id: 'd7_snack', description: 'COLLATION : Pomme' },
      { id: 'd7_supper', description: 'SOUPER : Poulet au beurre (avec Sauce KFI Poulet au beurre végétalien) + riz brun + épinards' },
    ],
  },
];

export const LOCAL_STORAGE_GROCERIES_DONE_KEY = 'nusAGabDotCom_groceriesDone'; // Updated prefix
export const LOCAL_STORAGE_GROCERY_ITEMS_KEY = 'nusAGabDotCom_groceryItemsChecked'; // Updated prefix
export const LOCAL_STORAGE_DAILY_PROGRESS_KEY = 'nusAGabDotCom_dailyProgress'; // Updated prefix
export const LOCAL_STORAGE_CURRENT_DAY_KEY = 'nusAGabDotCom_currentDayIndex'; // Updated prefix

