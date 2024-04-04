import React, { useState } from "react";

export const Macrotrackerapi = ({ onAdd }) => {
  const [query, setQuery] = useState("");
  const [nutrition, setNutrition] = useState(null);
  const [mealType, setMealType] = useState("breakfast");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://api.calorieninjas.com/v1/nutrition?query=${query}`,
        {
          method: "GET",
          headers: { "X-Api-Key": "OE6QCELAPANx8gXvPS3SMQ==tfP3w09EJuTZ6Ahg" },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data)
      setNutrition(data.items[0]);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setNutrition(null);
    }
  };

  const clearInput = () => {
    setQuery(""); // Clear the query state
    setNutrition(null); // Clear the nutrition state
  };

  return (
    <div style={{ minHeight: "50%", background: "#f0e68c", padding: "20px" }}>
      <form onSubmit={handleSubmit}>
      <div style={{ color: "#1d5d24", padding: "10px", fontSize: "24px", fontWeight: "bold" }}>Macro Tracker</div>

        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for food"
          />
          <button
            className="btn btn-success"
            type="button"
            onClick={clearInput}>
            X
          </button>
        </div>
        <select
          className="form-select mb-3"
          value={mealType}
          onChange={(e) => setMealType(e.target.value)}>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="snack">Snack</option>
        </select>
        <button
          className="btn btn-success"
          onClick={handleSubmit}
          type="submit">
          Search
        </button>
        {nutrition && (
        <div>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li>Food Item: {nutrition.name}</li>
            <li>Calories: {nutrition.calories}</li>
            <li>Serving Size: {nutrition.serving_size_g} g</li>
            <li>Fat: {nutrition.fat_total_g} g</li>
            <li>Sugar: {nutrition.sugar_g} g</li>
            <li>Fiber: {nutrition.fiber_g} g</li>
            <li>Protein: {nutrition.protein_g} g</li>
            <li>Cholesterol: {nutrition.cholesterol_mg} mg</li>
            <li>Carbohydrates: {nutrition.carbohydrates_total_g} g</li>
            <li>Saturated Fat: {nutrition.fat_saturated_g} g</li>
            <li>Sodium: {nutrition.sodium_mg} mg</li>
          </ul>
          <button onClick={() => onAdd(nutrition, mealType)} className="btn btn-success">
            Add to Meal
          </button>
        </div>
      )}
      </form>
      
    </div>
  );
};
