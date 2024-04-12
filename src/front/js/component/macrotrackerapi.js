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
    <div style={{ minHeight: "50%", background: "#2e8540", padding: "20px" }}>
      <form onSubmit={handleSubmit}>
      <div style={{ color: "white", padding: "10px", fontSize: "24px", fontWeight: "bold" }}>Macro Tracker</div>

        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for food"
          />
          <button
            className="btn btn-salmon"
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
        <div style={{ marginTop: 'auto', textAlign: 'right' }}>
        <button
          className="btn btn-salmon"
          onClick={handleSubmit}
          type="submit"
        >
          Search
        </button>
      </div>

        {nutrition && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
  <ul style={{ listStyleType: "none", padding: 0, color: "white", display: "flex", flexDirection: "row", flexWrap: "wrap", margin: 0 }}>
    <li style={{ marginRight: "10px" }}><strong>Food Item:</strong> {nutrition.name}</li>
    <li style={{ marginRight: "10px" }}><strong>Calories:</strong> {nutrition.calories}</li>
    <li style={{ marginRight: "10px" }}><strong>Serving Size:</strong> {nutrition.serving_size_g} g</li>
    <li style={{ marginRight: "10px" }}><strong>Fat:</strong> {nutrition.fat_total_g} g</li>
    <li style={{ marginRight: "10px" }}><strong>Sugar:</strong> {nutrition.sugar_g} g</li>
    <li style={{ marginRight: "10px" }}><strong>Fiber:</strong> {nutrition.fiber_g} g</li>
    <li style={{ marginRight: "10px" }}><strong>Protein:</strong> {nutrition.protein_g} g</li>
    <li style={{ marginRight: "10px" }}><strong>Cholesterol:</strong> {nutrition.cholesterol_mg} mg</li>
    <li style={{ marginRight: "10px" }}><strong>Carbohydrates:</strong> {nutrition.carbohydrates_total_g} g</li>
    <li style={{ marginRight: "10px" }}><strong>Saturated Fat:</strong> {nutrition.fat_saturated_g} g</li>
    <li><strong>Sodium:</strong> {nutrition.sodium_mg} mg</li>
  </ul>
  <button onClick={() => onAdd(nutrition, mealType)} className="btn btn-salmon">
    Add to Meal
  </button>
</div>

      
      )}
      </form>
      
    </div>
  );
};
