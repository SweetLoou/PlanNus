
import React, { useState, useEffect, useCallback } from 'react';
import { APP_NAME, WEEK_NAME, GROCERY_ITEMS } from '../constants';
import { GroceryItem, GroceryCheckedState } from '../types';
import CustomCheckbox from '../components/CustomCheckbox';
import StyledButton from '../components/StyledButton';

interface GroceryScreenProps {
  onCompleted: () => void; // Renamed from "on 완료"
  initialCheckedState: GroceryCheckedState;
  onCheckedStateChange: (newState: GroceryCheckedState) => void;
}

const GroceryScreen: React.FC<GroceryScreenProps> = ({ onCompleted, initialCheckedState, onCheckedStateChange }) => {
  const [checkedItems, setCheckedItems] = useState<GroceryCheckedState>(initialCheckedState);

  useEffect(() => {
    setCheckedItems(initialCheckedState);
  }, [initialCheckedState]);

  const handleItemChange = useCallback((itemId: string, isChecked: boolean) => {
    const newState = { ...checkedItems, [itemId]: isChecked };
    setCheckedItems(newState);
    onCheckedStateChange(newState);
  }, [checkedItems, onCheckedStateChange]);

  const allItemsChecked = GROCERY_ITEMS.every(item => checkedItems[item.id]);
  const isSelectAllChecked = GROCERY_ITEMS.length > 0 && allItemsChecked;

  const handleSelectAllChange = (isSelectAll: boolean) => {
    const newSelectAllState: GroceryCheckedState = {};
    GROCERY_ITEMS.forEach(item => {
      newSelectAllState[item.id] = isSelectAll;
    });
    setCheckedItems(newSelectAllState);
    onCheckedStateChange(newSelectAllState);
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-sky-100 to-indigo-100">
      <div className="bg-white shadow-2xl rounded-xl p-6 md:p-10 w-full max-w-2xl">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-sky-700">
            📱 {APP_NAME} | {WEEK_NAME}
          </h1>
        </header>

        <main>
          <div className="mb-8 p-6 bg-sky-50 rounded-lg">
            <h2 className="text-2xl font-semibold text-sky-600 mb-3">
              ÉTAPE 1 : LISTE D'ÉPICERIE
            </h2>
            <p className="text-slate-600 mb-6">
              Avant de commencer, assurez-vous d'avoir tous ces articles.
            </p>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {GROCERY_ITEMS.map((item: GroceryItem) => (
                <CustomCheckbox
                  key={item.id}
                  id={`grocery-${item.id}`}
                  label={item.name}
                  checked={!!checkedItems[item.id]}
                  onChange={(isChecked) => handleItemChange(item.id, isChecked)}
                  labelClassName="text-lg"
                />
              ))}
            </div>
          </div>
          
          <div className="border-t border-slate-200 pt-6 mb-6">
             <CustomCheckbox
                id="select-all-groceries"
                label="TOUT SÉLECTIONNER"
                checked={isSelectAllChecked}
                onChange={handleSelectAllChange}
                labelClassName="font-semibold text-lg"
              />
          </div>

          <StyledButton
            onClick={onCompleted} // Changed from on 완료
            disabled={!allItemsChecked}
            className="w-full text-lg py-3"
            variant="primary"
          >
            ✅ J'ai fait mon épicerie, commencer le plan !
          </StyledButton>
        </main>
      </div>
       <footer className="mt-8 text-center text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} {APP_NAME}. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default GroceryScreen;
