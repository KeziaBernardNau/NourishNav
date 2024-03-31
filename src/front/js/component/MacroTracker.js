import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/macroTracker.css";
import { Macrotrackerapi } from "../component/macrotrackerapi"; // Ensure this import matches the export

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

  useEffect(() => {
    document.body.style.background =
      "linear-gradient(to bottom right, #72bb53, #ffffff)";
    return () => {
      document.body.style.background = "";
    };
  }, []);

  // Modified function to accept mealType
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
      [mealType]: [...prevMeals[mealType], newFoodItem], // Add to specific meal type
    }));

    // Update total macros
    setTotalMacros((prev) => ({
      calories: prev.calories + newFoodItem.calories,
      protein: prev.protein + newFoodItem.protein,
      fat: prev.fat + newFoodItem.fat,
      carbohydrates: prev.carbohydrates + newFoodItem.carbohydrates,
    }));
  };

  return (
    <div className="macro-container">
      <h1 style={{ color: "#FFFFFF", textAlign: "center", fontWeight: "bold" }}>
        NourishNav
      </h1>

      <Macrotrackerapi onAdd={handleAddFood} />

      {Object.entries(meals).map(([mealType, items]) => (
        <div key={mealType}>
          <h2>{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</h2>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                {item.foodItem} - {item.calories} calories, {item.protein}g protein,
                {item.fat}g fat, {item.carbohydrates}g carbohydrates
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="total-macros">
        <h3>Total Macros</h3>
        <p>Calories: {totalMacros.calories}</p>
        <p>Protein: {totalMacros.protein}g</p>
        <p>Fat: {totalMacros.fat}g</p>
        <p>Carbohydrates: {totalMacros.carbohydrates}g</p>
      </div>
    </div>
  );
}

export default MacroTracker;
