import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/macroTracker.css";
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
      quantity: 1, // Initial quantity set to 1
    };

    setMeals((prevMeals) => ({
      ...prevMeals,
      [mealType]: [...prevMeals[mealType], newFoodItem],
    }));

    setTotalMacros((prev) => ({
      calories: Math.round(prev.calories + nutrition.calories),
      protein: Math.round(prev.protein + nutrition.protein_g),
      fat: Math.round(prev.fat + nutrition.fat_total_g),
      carbohydrates: Math.round(prev.carbohydrates + nutrition.carbohydrates_total_g),
    }));
  };

  const toggleMealType = (mealType) => {
    setSelectedMealType(selectedMealType === mealType ? "" : mealType);
  };

  const handleDeleteFood = (mealType, itemId, itemQuantity) => {
    const itemToDelete = meals[mealType].find(item => item.id === itemId);
    setMeals((prevMeals) => ({
      ...prevMeals,
      [mealType]: prevMeals[mealType].filter((item) => item.id !== itemId),
    }));
    setTotalMacros((prev) => ({
      calories: Math.round(prev.calories - (itemToDelete.calories * itemQuantity)),
      protein: Math.round(prev.protein - (itemToDelete.protein * itemQuantity)),
      fat: Math.round(prev.fat - (itemToDelete.fat * itemQuantity)),
      carbohydrates: Math.round(prev.carbohydrates - (itemToDelete.carbohydrates * itemQuantity)),
    }));
  };

  const handleEditFood = (mealType, itemId, newQuantity) => {
    const itemToEdit = meals[mealType].find(item => item.id === itemId);
    const oldQuantity = itemToEdit.quantity;
    setMeals((prevMeals) => ({
      ...prevMeals,
      [mealType]: prevMeals[mealType].map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ),
    }));

    // Update total macros
    setTotalMacros((prev) => ({
      calories: Math.round(prev.calories - (itemToEdit.calories * oldQuantity) + (itemToEdit.calories * newQuantity)),
      protein: Math.round(prev.protein - (itemToEdit.protein * oldQuantity) + (itemToEdit.protein * newQuantity)),
      fat: Math.round(prev.fat - (itemToEdit.fat * oldQuantity) + (itemToEdit.fat * newQuantity)),
      carbohydrates: Math.round(prev.carbohydrates - (itemToEdit.carbohydrates * oldQuantity) + (itemToEdit.carbohydrates * newQuantity)),
    }));
  };

  return (
    <div className="macro-container">
      <div className="total-calories-container">
        <div className="total-calories-circle">
          {totalMacros.calories}
        </div>
        <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Total Calories</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap' }}>
        <h5 style={{ margin: 0, padding: '0 10px' }}>Calories: {totalMacros.calories}</h5>
        <h5 style={{ margin: 0, padding: '0 10px' }}>Protein: {totalMacros.protein}g</h5>
        <h5 style={{ margin: 0, padding: '0 10px' }}>Fat: {totalMacros.fat}g</h5>
        <h5 style={{ margin: 0, padding: '0 10px' }}>Carbohydrates: {totalMacros.carbohydrates}g</h5>
      </div>

      <div className="flex-container">
        <div className="macro-api-section section">
          <Macrotrackerapi 
            onAdd={handleAddFood} 
            onDelete={handleDeleteFood} 
            onEdit={handleEditFood} 
          />
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
                        <div>
                          <span>
                            {item.foodItem} - {Math.round(item.calories * item.quantity)} calories, {Math.round(item.protein * item.quantity)}g protein, {Math.round(item.fat * item.quantity)}g fat, {Math.round(item.carbohydrates * item.quantity)}g carbohydrates
                          </span>
                          <input 
                            type="number" 
                            value={item.quantity} 
                            onChange={(e) => handleEditFood(mealType, item.id, parseInt(e.target.value, 10))} 
                          />
                        </div>
                        <button onClick={() => handleDeleteFood(mealType, item.id, item.quantity)} className="btn salmon-button"><i class="fa-solid fa-x"></i></button>

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

