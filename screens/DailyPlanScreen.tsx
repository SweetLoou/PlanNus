
import React, { useState, useEffect, useCallback } from 'react';
import { APP_NAME, DAILY_PLANS_DATA, GROCERY_ITEMS } from '../constants';
import { DailyPlan, TaskItem, GroceryItem, DailyProgressState } from '../types';
import CustomCheckbox from '../components/CustomCheckbox';
import StyledButton from '../components/StyledButton';
import Modal from '../components/Modal';
import CheckIcon from '../components/icons/CheckIcon'; // Added import

interface DailyPlanScreenProps {
  currentDayIndex: number;
  setCurrentDayIndex: (index: number) => void;
  dailyProgress: DailyProgressState;
  onDailyProgressChange: (dayId: string, taskIndex: number, isCompleted: boolean) => void;
}

const ProgressBarText: React.FC<{ progress: number }> = ({ progress }) => {
  const filledChar = '▓';
  const emptyChar = '░';
  const barLength = 20;
  const filledCount = Math.round((progress / 100) * barLength);
  const barDisplay = filledChar.repeat(filledCount) + emptyChar.repeat(barLength - filledCount);
  return <span className="font-mono tracking-tighter text-sm md:text-base">{`[${barDisplay}]`}</span>;
};


const DailyPlanScreen: React.FC<DailyPlanScreenProps> = ({ 
  currentDayIndex, 
  setCurrentDayIndex, 
  dailyProgress, 
  onDailyProgressChange 
}) => {
  const [isGroceryListModalOpen, setIsGroceryListModalOpen] = useState(false);
  
  const currentPlan = DAILY_PLANS_DATA[currentDayIndex];
  const currentDayProgress = dailyProgress[currentPlan.dayId] || Array(currentPlan.tasks.length).fill(false);

  const calculateProgress = useCallback(() => {
    const completedTasks = currentDayProgress.filter(Boolean).length;
    return (completedTasks / currentPlan.tasks.length) * 100;
  }, [currentDayProgress, currentPlan.tasks.length]);

  const [progressPercentage, setProgressPercentage] = useState(calculateProgress());

  useEffect(() => {
    setProgressPercentage(calculateProgress());
  }, [currentDayProgress, calculateProgress]);

  const handleTaskChange = (taskIndex: number, isCompleted: boolean) => {
    onDailyProgressChange(currentPlan.dayId, taskIndex, isCompleted);
  };

  const navigateDay = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentDayIndex > 0) {
      setCurrentDayIndex(currentDayIndex - 1);
    } else if (direction === 'next' && currentDayIndex < DAILY_PLANS_DATA.length - 1) {
      setCurrentDayIndex(currentDayIndex + 1);
    }
  };
  
  const isGoalReached = progressPercentage === 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-emerald-50 to-teal-100">
      <div className="bg-white shadow-2xl rounded-xl p-6 md:p-10 w-full max-w-2xl">
        <header className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-teal-700">
            📱 {APP_NAME} | {currentPlan.dayTitle.toUpperCase()}
          </h1>
        </header>

        <main>
          <div className="mb-6 text-center">
            <p className="text-slate-600 text-lg">Progression du jour : 
              <ProgressBarText progress={progressPercentage} /> {progressPercentage.toFixed(0)}%
            </p>
            {isGoalReached && (
              <p className="mt-2 text-xl font-semibold text-emerald-600 animate-pulse">
                Objectif du jour atteint ! 💪
              </p>
            )}
          </div>

          <div className="mb-6 p-4 bg-teal-50 rounded-lg">
            <h3 className="text-xl font-semibold text-teal-600 mb-3">OBJECTIF QUOTIDIEN (7h à 19h)</h3>
            <CustomCheckbox
              id={`task-${currentPlan.dayId}-${currentPlan.tasks[0].id}`}
              label={currentPlan.tasks[0].description}
              checked={currentDayProgress[0]}
              onChange={(isChecked) => handleTaskChange(0, isChecked)}
              labelClassName="text-lg"
            />
          </div>

          <div className="mb-8 p-4 bg-emerald-50 rounded-lg">
            <h3 className="text-xl font-semibold text-emerald-600 mb-3">REPAS DU JOUR</h3>
            <div className="space-y-3">
              {currentPlan.tasks.slice(1).map((task: TaskItem, index: number) => (
                <CustomCheckbox
                  key={task.id}
                  id={`task-${currentPlan.dayId}-${task.id}`}
                  label={task.description}
                  checked={currentDayProgress[index + 1]}
                  onChange={(isChecked) => handleTaskChange(index + 1, isChecked)}
                  labelClassName="text-lg"
                />
              ))}
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-8">
            <StyledButton 
              onClick={() => navigateDay('prev')} 
              disabled={currentDayIndex === 0}
              variant="secondary"
            >
              &lt; JOUR PRÉCÉDENT
            </StyledButton>
            <StyledButton 
              onClick={() => navigateDay('next')} 
              disabled={currentDayIndex === DAILY_PLANS_DATA.length - 1}
              variant="secondary"
            >
              JOUR SUIVANT &gt;
            </StyledButton>
          </div>

          <StyledButton
            onClick={() => setIsGroceryListModalOpen(true)}
            className="w-full"
            variant="outline"
          >
            🛒 VOIR MA LISTE D'ÉPICERIE
          </StyledButton>
        </main>
      </div>
      
      <footer className="mt-8 text-center text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} {APP_NAME}. Tous droits réservés.</p>
      </footer>

      <Modal
        isOpen={isGroceryListModalOpen}
        onClose={() => setIsGroceryListModalOpen(false)}
        title="Ma Liste d'Épicerie Validée"
      >
        <ul className="space-y-2 list-disc list-inside text-slate-700">
          {GROCERY_ITEMS.map((item: GroceryItem) => (
            <li key={item.id} className="flex items-center">
              <CheckIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
              {item.name}
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
};

export default DailyPlanScreen;
