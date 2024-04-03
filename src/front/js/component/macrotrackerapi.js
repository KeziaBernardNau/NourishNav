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
          type="submit">
          Search
        </button>
      </form>
      {nutrition && (
        <div style={{ color: "#1d5d24" }}>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {/* Nutrition information list items omitted for brevity */}
          </ul>
          <button
            className="btn btn-success"
            onClick={() => onAdd(nutrition, mealType)}>
            Add to Meal
          </button>
        </div>
      )}
    </div>
  );
};
