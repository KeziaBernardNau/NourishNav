import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/macroTracker.css";

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
  const [eatenCalories, setEatenCalories] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const totalCaloriesAllowed = 2000; // Total calories allowed per day
  const [circlePosition, setCirclePosition] = useState(0);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    const localDate = today.toLocaleDateString("en-CA"); // YYYY-MM-DD format
    return localDate;
  });
  const [showModal, setShowModal] = useState(false);
  const [mealTypeToAdd, setMealTypeToAdd] = useState("");
  const [foodItem, setFoodItem] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [fat, setFat] = useState("");
  const [carbohydrates, setCarbohydrates] = useState("");

  useEffect(() => {
    document.body.style.background =
      "linear-gradient(to bottom right, #72bb53, #ffffff)";

    return () => {
      document.body.style.background = "";
    };
  }, []);

  useEffect(() => {
    const calculateCirclePosition = () => {
      const percentConsumed = (eatenCalories / totalCaloriesAllowed) * 100;
      setCirclePosition(percentConsumed);
    };

    calculateCirclePosition();
  }, [eatenCalories]);

  const addFood = () => {
    const newFoodItem = {
      id: Date.now(), // Unique ID for each food item
      foodItem,
      calories: parseInt(calories),
      protein: parseInt(protein),
      fat: parseInt(fat),
      carbohydrates: parseInt(carbohydrates),
    };

    setMeals((prevMeals) => ({
      ...prevMeals,
      [mealTypeToAdd]: [...prevMeals[mealTypeToAdd], newFoodItem],
    }));
    console.log(totalMacros);
    console.log(parseInt(calories));
    console.log(parseInt(protein));
    setTotalMacros((prevTotalMacros) => ({
      calories: prevTotalMacros.calories + parseInt(calories),
      protein: prevTotalMacros.protein + parseInt(protein),
      fat: prevTotalMacros.fat + parseInt(fat),
      carbohydrates: prevTotalMacros.carbohydrates + parseInt(carbohydrates),
    }));

    setEatenCalories(
      (prevEatenCalories) => prevEatenCalories + parseInt(calories)
    );

    setFoodItem("");
    setCalories("");
    setProtein("");
    setFat("");
    setCarbohydrates("");
    setShowModal(false);
  };

  const deleteFood = (mealType, id, macros) => {
    const updatedMeals = {
      ...meals,
      [mealType]: meals[mealType].filter((item) => item.id !== id),
    };
    setMeals(updatedMeals);

    setTotalMacros((prevTotalMacros) => ({
      calories: prevTotalMacros.calories - macros.calories,
      protein: prevTotalMacros.protein - macros.protein,
      fat: prevTotalMacros.fat - macros.fat,
      carbohydrates: prevTotalMacros.carbohydrates - macros.carbohydrates,
    }));

    setEatenCalories(
      (prevEatenCalories) => prevEatenCalories - macros.calories
    );
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleAddMeal = (mealType) => {
    setMealTypeToAdd(mealType);
    setShowModal(true);
  };

  // Function to calculate recommended calories for each meal type
  const getRecommendedCalories = (mealType) => {
    switch (mealType) {
      case "breakfast":
        return 500; // 25% of 2000 calories
      case "lunch":
      case "dinner":
        return 600; // 30% of 2000 calories
      case "snack":
        return 300; // 15% of 2000 calories
      default:
        return 0;
    }
  };

  // Function to get the appropriate Font Awesome icon for each meal type
  const getMealIcon = (mealType) => {
    switch (mealType) {
      case "breakfast":
        return <i class="fa-solid fa-mug-saucer"></i>;
      case "lunch":
        return <i class="fa-solid fa-hotdog"></i>;
      case "dinner":
        return <i class="fa-solid fa-bowl-food"></i>;
      case "snack":
        return <i class="fa-solid fa-apple-whole"></i>;
      default:
        return null;
    }
  };

  return (
    <div className="macro-container">
      <h1 style={{ color: "#FFFFFF", textAlign: "center", fontWeight: "bold" }}>
        NourishNav
      </h1>
      <div className="calories-container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
  <div className="eaten-calories" style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: "16px" }}>
    {eatenCalories} EATEN
  </div>
  <div className="circle" style={{ width: "150px", height: "150px", position: "relative" }}>
    <span
      id="total-calories"
      style={{ color: "#72BB53", fontSize: "30px", fontWeight: "bold", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
    >
      {totalCaloriesAllowed - eatenCalories + caloriesBurned}
    </span>
  </div>
  <div className="burned-calories" style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: "16px" }}>
    {caloriesBurned} BURNED
  </div>
</div>



      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="date-picker-container mb-3">
            <label htmlFor="date-picker" style={{ color: "#72BB53" }}></label>
            <input
              type="date"
              id="date-picker"
              className="form-control"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>
        </div>
      </div>

      {Object.keys(meals).map((mealType, index) => (
        <div className="meal-container" key={index}>
          <div className="d-flex justify-content-between align-items-center">
            {/* Icon */}
            <div className="meal-icon">{getMealIcon(mealType)}</div>
            {/* Meal name and recommended calories */}
            <div className="meal-details d-flex flex-column">
              <div className="d-flex align-items-center flex-column">
                {/* Meal name */}
                <div className="meal-name" style={{ color: "#EE6E57" }}>
                  {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
                </div>
                {/* Recommended calories */}
                <p
                  className="recommended-calories"
                  style={{ color: "#333", marginLeft: "10px" }}
                >
                  {getRecommendedCalories(mealType)} Calories
                </p>
              </div>
            </div>
            {/* Add meal button */}
            <button
              className="btn btn-primary"
              style={{ backgroundColor: "#EE6E57", borderColor: "#EE6E57" }}
              onClick={() => handleAddMeal(mealType)}
            >
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
          {/* List of food items */}
          <ul className="list-group mt-2">
            {meals[mealType].map((item, mealIndex) => (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={mealIndex}
              >
                <span>
                  {item.foodItem} - {item.calories} calories, {item.protein}g
                  protein, {item.fat}g fat, {item.carbohydrates}g carbs
                </span>
                {/* Delete button */}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() =>
                    deleteFood(mealType, item.id, {
                      calories: item.calories,
                      protein: item.protein,
                      fat: item.fat,
                      carbohydrates: item.carbohydrates,
                    })
                  }
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div
        className={`modal ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content" style={{ backgroundColor: "#f9f9f9" }}>
            <div
              className="modal-header"
              style={{ backgroundColor: "#EE6E57", color: "#fff" }}
            >
              <h5 className="modal-title">Add {mealTypeToAdd} Meal</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowModal(false)}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  padding: "0",
                }}
              >
                <span aria-hidden="true">
                  <i class="fa-solid fa-x"></i>
                </span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="food-item">Food Item:</label>
                <input
                  type="text"
                  id="food-item"
                  className="form-control"
                  value={foodItem}
                  onChange={(e) => setFoodItem(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="calories">Calories:</label>
                <input
                  type="number"
                  id="calories"
                  className="form-control"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="protein">Protein (g):</label>
                <input
                  type="number"
                  id="protein"
                  className="form-control"
                  value={protein}
                  onChange={(e) => setProtein(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="fat">Fat (g):</label>
                <input
                  type="number"
                  id="fat"
                  className="form-control"
                  value={fat}
                  onChange={(e) => setFat(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="carbohydrates">Carbohydrates (g):</label>
                <input
                  type="number"
                  id="carbohydrates"
                  className="form-control"
                  value={carbohydrates}
                  onChange={(e) => setCarbohydrates(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={addFood}
              >
                Add Food
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MacroTracker;
