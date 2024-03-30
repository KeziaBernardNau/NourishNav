import React, { useEffect } from "react";
import { recipe_list } from "../component/recipe_data";
import "../../styles/recipe.css";

const Recipe = () => {
  useEffect(() => {
    console.log(recipe_list);
  }, []);

  const addFavorite = (recipe) => {
    console.log("Add to favorites:", recipe.title);
    // Placeholder for add to favorites functionality
  };

  // Function to filter recipes by mealType
  const filterByMealType = (mealType) => {
    return recipe_list.filter((recipe) => recipe.mealType === mealType);
  };

  const MealSection = ({ mealType }) => (
    <>
      <h2 style={{ marginBottom: "20px" }}>{mealType}</h2>
      <div className="recipe-container">
        {filterByMealType(mealType).map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <img
              src={recipe.img_url}
              className="card-img-top"
              alt={recipe.title}
            />
            <div className="card-body">
              <h5 className="card-title">{recipe.title}</h5>
              <p className="card-text">{recipe.desc}</p>
              <button
                className="btn btn-success"
                onClick={() => addFavorite(recipe)}
              >
                Add to Favorites
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div className="container-fluid">
      <h1>Recipes</h1>
      <MealSection mealType="Breakfast" />
      <MealSection mealType="Lunch" />
      <MealSection mealType="Dinner" />
    </div>
  );
};

export default Recipe;
