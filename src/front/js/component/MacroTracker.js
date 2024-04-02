// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../../styles/macroTracker.css";
// import { Macrotrackerapi } from "../component/macrotrackerapi"; // Assuming correct path

// function MacroTracker() {
//   const [meals, setMeals] = useState({
//     breakfast: [],
//     lunch: [],
//     dinner: [],
//     snack: [],
//   });
//   const [totalMacros, setTotalMacros] = useState({
//     calories: 0,
//     protein: 0,
//     fat: 0,
//     carbohydrates: 0,
//   });
//   const [eatenCalories, setEatenCalories] = useState(0);
//   const [caloriesBurned, setCaloriesBurned] = useState(0);
//   const totalCaloriesAllowed = 2000; // Total calories allowed per day
//   const [circlePosition, setCirclePosition] = useState(0);
//   const [selectedDate, setSelectedDate] = useState(() => {
//     const today = new Date();
//     const localDate = today.toLocaleDateString("en-CA"); // YYYY-MM-DD format
//     return localDate;
//   });
//   const [showModal, setShowModal] = useState(false);
//   const [mealTypeToAdd, setMealTypeToAdd] = useState("");
//   const [foodItem, setFoodItem] = useState("");
//   const [calories, setCalories] = useState("");
//   const [protein, setProtein] = useState("");
//   const [fat, setFat] = useState("");
//   const [carbohydrates, setCarbohydrates] = useState("");

//   useEffect(() => {
//     document.body.style.background =
//       "linear-gradient(to bottom right, #72bb53, #ffffff)";

//     return () => {
//       document.body.style.background = "";
//     };
//   }, []);

//   useEffect(() => {
//     const calculateCirclePosition = () => {
//       const percentConsumed = (eatenCalories / totalCaloriesAllowed) * 100;
//       setCirclePosition(percentConsumed);
//     };

//     calculateCirclePosition();
//   }, [eatenCalories]);

//   const addFood = () => {
//     const newFoodItem = {
//       id: Date.now(), // Unique ID for each food item
//       foodItem,
//       calories: parseInt(calories),
//       protein: parseInt(protein),
//       fat: parseInt(fat),
//       carbohydrates: parseInt(carbohydrates),
//     };

//     setMeals((prevMeals) => ({
//       ...prevMeals,
//       [mealTypeToAdd]: [...prevMeals[mealTypeToAdd], newFoodItem],
//     }));
//     console.log(totalMacros);
//     console.log(parseInt(calories));
//     console.log(parseInt(protein));
//     setTotalMacros((prevTotalMacros) => ({
//       calories: prevTotalMacros.calories + parseInt(calories),
//       protein: prevTotalMacros.protein + parseInt(protein),
//       fat: prevTotalMacros.fat + parseInt(fat),
//       carbohydrates: prevTotalMacros.carbohydrates + parseInt(carbohydrates),
//     }));

//     setEatenCalories(
//       (prevEatenCalories) => prevEatenCalories + parseInt(calories)
//     );

//     setFoodItem("");
//     setCalories("");
//     setProtein("");
//     setFat("");
//     setCarbohydrates("");
//     setShowModal(false);
//   };

//   const deleteFood = (mealType, id, macros) => {
//     const updatedMeals = {
//       ...meals,
//       [mealType]: meals[mealType].filter((item) => item.id !== id),
//     };
//     setMeals(updatedMeals);

//     setTotalMacros((prevTotalMacros) => ({
//       calories: prevTotalMacros.calories - macros.calories,
//       protein: prevTotalMacros.protein - macros.protein,
//       fat: prevTotalMacros.fat - macros.fat,
//       carbohydrates: prevTotalMacros.carbohydrates - macros.carbohydrates,
//     }));

//     setEatenCalories(
//       (prevEatenCalories) => prevEatenCalories - macros.calories
//     );
//   };

//   const handleDateChange = (e) => {
//     setSelectedDate(e.target.value);
//   };

//   const handleAddMeal = (mealType) => {
//     setMealTypeToAdd(mealType);
//     setShowModal(true);
//   };

//   // Function to calculate recommended calories for each meal type
//   const getRecommendedCalories = (mealType) => {
//     switch (mealType) {
//       case "breakfast":
//         return 500; // 25% of 2000 calories
//       case "lunch":
//       case "dinner":
//         return 600; // 30% of 2000 calories
//       case "snack":
//         return 300; // 15% of 2000 calories
//       default:
//         return 0;
//     }
//   };

//   // Function to get the appropriate Font Awesome icon for each meal type
//   const getMealIcon = (mealType) => {
//     switch (mealType) {
//       case "breakfast":
//         return <i className="fa-solid fa-mug-saucer"></i>;
//       case "lunch":
//         return <i className="fa-solid fa-hotdog"></i>;
//       case "dinner":
//         return <i className="fa-solid fa-bowl-food"></i>;
//       case "snack":
//         return <i className="fa-solid fa-apple-whole"></i>;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="macro-container">
//       <div className="macro-api-section">
//         <Macrotrackerapi onAdd={addFood} />
//       </div>
//       <div className="food-entries-section">
//         {Object.entries(meals).map(([mealType, items]) => (
//           <div key={mealType}>
//             <h2>{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</h2>
//             <ul>
//               {items.map((item) => (
//                 <li key={item.id}>
//                   {item.foodItem} - {item.calories} calories, {item.protein}g protein,
//                   {item.fat}g fat, {item.carbohydrates}g carbohydrates
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//         <div className="total-macros">
//           <h3>Total Macros</h3>
//           <p>Calories: {totalMacros.calories}</p>
//           <p>Protein: {totalMacros.protein}g</p>
//           <p>Fat: {totalMacros.fat}g</p>
//           <p>Carbohydrates: {totalMacros.carbohydrates}g</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MacroTracker;











// original code with api
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
