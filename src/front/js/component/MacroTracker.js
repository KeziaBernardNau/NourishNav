import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/macroTracker.css";
import { Macrotrackerapi } from "../component/macrotrackerapi";
import Calendar from 'react-calendar'; 
import { format } from 'date-fns';
import { WaterTracker } from "./WaterTracker";


const calculateTotalCalories = (mealItems) => {
  return mealItems.reduce((total, item) => total + (item.calories * item.quantity), 0);
};

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
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    // Calculate total macros when meals change
    const totalCalories = Object.values(meals).reduce((acc, meal) => acc + calculateTotalCalories(meal), 0);
    setTotalMacros((prev) => ({ ...prev, calories: totalCalories }));
  }, [meals]);

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar); 
    setSelectedDate(new Date()); 
  };

  const onChangeCalendar = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleAddFood = (nutrition, mealType) => {
    const newFoodItem = {
      id: Date.now(),
      foodItem: nutrition.name,
      calories: nutrition.calories,
      protein: nutrition.protein_g,
      fat: nutrition.fat_total_g,
      carbohydrates: nutrition.carbohydrates_total_g,
      quantity: 1, 
    };

    setMeals((prevMeals) => ({
      ...prevMeals,
      [mealType]: [...prevMeals[mealType], newFoodItem],
    }));
  };

  const handleDeleteFood = (mealType, itemId, itemQuantity) => {
    setMeals((prevMeals) => ({
      ...prevMeals,
      [mealType]: prevMeals[mealType].filter((item) => item.id !== itemId),
    }));
  };

  const handleEditFood = (mealType, itemId, newQuantity) => {
    setMeals((prevMeals) => ({
      ...prevMeals,
      [mealType]: prevMeals[mealType].map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ),
    }));
  };

  return (
    <div className="macro-container">
      <div className="total-calories-container">
        <div className="total-calories-circle">
          {totalMacros.calories}
        </div>
        <p style={{ fontSize: '28px', fontWeight: 'bold' }}>Total Calories</p>
      </div>

      <div className="macros-info-container">
        <h5 style={{ margin: 0, padding: '0 10px' }}>Calories: {totalMacros.calories}</h5>
        <h5 style={{ margin: 0, padding: '0 10px' }}>Protein: {totalMacros.protein}g</h5>
        <h5 style={{ margin: 0, padding: '0 10px' }}>Fat: {totalMacros.fat}g</h5>
        <h5 style={{ margin: 0, padding: '0 10px' }}>Carbohydrates: {totalMacros.carbohydrates}g</h5>
      </div>

      <div className="calendar-control" onClick={toggleCalendar}>
        <button className="btn btn-success">
          {format(selectedDate, "MMMM d, yyyy")} 
        </button>
      </div>

      {showCalendar && (
        <div className="calendar-section mt-4">
          <Calendar
            onChange={onChangeCalendar}
            value={selectedDate}
            minDetail="day"
          />
        </div>
      )}

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
                onClick={() => setSelectedMealType(mealType)}
                className="meal-type-button"
              >
                {mealType.charAt(0).toUpperCase() + mealType.slice(1)} - Total Calories: {calculateTotalCalories(meals[mealType])}
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
      <div className="water-tracker-section section">
        <WaterTracker />
      </div>
      <div className="bottom-right-image-container"></div>
    </div>
  );
}

export default MacroTracker;

