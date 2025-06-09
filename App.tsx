
import React, { useState, useEffect, useCallback } from 'react';
import GroceryScreen from './screens/GroceryScreen';
import DailyPlanScreen from './screens/DailyPlanScreen';
import { GroceryCheckedState, DailyProgressState } from './types';
import { 
  GROCERY_ITEMS, 
  DAILY_PLANS_DATA,
  LOCAL_STORAGE_GROCERIES_DONE_KEY,
  LOCAL_STORAGE_GROCERY_ITEMS_KEY,
  LOCAL_STORAGE_DAILY_PROGRESS_KEY,
  LOCAL_STORAGE_CURRENT_DAY_KEY 
} from './constants';

const App: React.FC = () => {
  const [groceriesDone, setGroceriesDone] = useState<boolean>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_GROCERIES_DONE_KEY);
    return saved ? JSON.parse(saved) : false;
  });

  const [groceryItemStates, setGroceryItemStates] = useState<GroceryCheckedState>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_GROCERY_ITEMS_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
    const initial: GroceryCheckedState = {};
    GROCERY_ITEMS.forEach(item => initial[item.id] = false);
    return initial;
  });

  const [dailyProgress, setDailyProgress] = useState<DailyProgressState>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_DAILY_PROGRESS_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
    const initial: DailyProgressState = {};
    DAILY_PLANS_DATA.forEach(plan => {
      initial[plan.dayId] = Array(plan.tasks.length).fill(false);
    });
    return initial;
  });

  const [currentDayIndex, setCurrentDayIndex] = useState<number>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_CURRENT_DAY_KEY);
    return saved ? JSON.parse(saved) : 0;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_GROCERIES_DONE_KEY, JSON.stringify(groceriesDone));
  }, [groceriesDone]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_GROCERY_ITEMS_KEY, JSON.stringify(groceryItemStates));
  }, [groceryItemStates]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_DAILY_PROGRESS_KEY, JSON.stringify(dailyProgress));
  }, [dailyProgress]);
  
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_CURRENT_DAY_KEY, JSON.stringify(currentDayIndex));
  }, [currentDayIndex]);


  const handleGroceriesCompleted = () => {
    setGroceriesDone(true);
    setCurrentDayIndex(0); // Start from Day 1
  };

  const handleGroceryItemChange = useCallback((newState: GroceryCheckedState) => {
    setGroceryItemStates(newState);
  }, []);

  const handleDailyProgressChange = useCallback((dayId: string, taskIndex: number, isCompleted: boolean) => {
    setDailyProgress(prev => {
      const newDayTasks = [...(prev[dayId] || [])];
      newDayTasks[taskIndex] = isCompleted;
      return { ...prev, [dayId]: newDayTasks };
    });
  }, []);

  if (!groceriesDone) {
    return <GroceryScreen 
              onCompleted={handleGroceriesCompleted} 
              initialCheckedState={groceryItemStates}
              onCheckedStateChange={handleGroceryItemChange}
            />;
  }

  return <DailyPlanScreen 
            currentDayIndex={currentDayIndex}
            setCurrentDayIndex={setCurrentDayIndex}
            dailyProgress={dailyProgress}
            onDailyProgressChange={handleDailyProgressChange}
          />;
};

export default App;