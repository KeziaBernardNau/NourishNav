import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/macroTracker.css"; // Ensure this path is correct
import { Macrotrackerapi } from "../component/macrotrackerapi";

function MacroTracker() {
  const [meals, setMeals] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
    snack: [],
  });
  const [totalMacros, setTotalMacros] = useState({
    calories: 0,
    protein: 0,
    fat: 0,
    carbohydrates: 0,
  });
  const [selectedMealType, setSelectedMealType] = useState("");

  const handleAddFood = (nutrition, mealType) => {
    const newFoodItem = {
      id: Date.now(),
      foodItem: nutrition.name,
      calories: nutrition.calories,
      protein: nutrition.protein_g,
      fat: nutrition.fat_total_g,
      carbohydrates: nutrition.carbohydrates_total_g,
    };

    setMeals((prevMeals) => ({
      ...prevMeals,
      [mealType]: [...prevMeals[mealType], newFoodItem],
    }));

    setTotalMacros((prev) => ({
      calories: prev.calories + newFoodItem.calories,
      protein: prev.protein + newFoodItem.protein,
      fat: prev.fat + newFoodItem.fat,
      carbohydrates: prev.carbohydrates + newFoodItem.carbohydrates,
    }));
  };

  const toggleMealType = (mealType) => {
    setSelectedMealType(selectedMealType === mealType ? "" : mealType);
  };

  return (
    <div className="macro-container">
      <h1 className="title">NourishNav</h1>

      <div className="total-macros section">
        <h3>Total Macros</h3>
        <p>Calories: {totalMacros.calories}</p>
        <p>Protein: {totalMacros.protein}g</p>
        <p>Fat: {totalMacros.fat}g</p>
        <p>Carbohydrates: {totalMacros.carbohydrates}g</p>
      </div>

      <div className="flex-container">
        <div className="macro-api-section section">
          <Macrotrackerapi onAdd={handleAddFood} />
        </div>

        <div className="food-entries-section section">
          {["breakfast", "lunch", "dinner", "snack"].map((mealType) => (
            <div key={mealType} className="meal-type-row">
              <button
                onClick={() => toggleMealType(mealType)}
                className="meal-type-button"
              >
                {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
              </button>
              {selectedMealType === mealType && (
                <div className="meal-details-container">
                  <ul className="list-group no-bullets">
                    {meals[mealType].map((item) => (
                      <li key={item.id} className="list-group-item">
                        {item.foodItem} - {item.calories} calories,{" "}
                        {item.protein}g protein, {item.fat}g fat,{" "}
                        {item.carbohydrates}g carbohydrates
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MacroTracker;
