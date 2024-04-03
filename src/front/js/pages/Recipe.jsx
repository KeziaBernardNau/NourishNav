import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { recipe_list } from "../component/recipe_data";
import "../../styles/recipe.css";

const Recipe = () => {
  useEffect(() => {
    console.log(recipe_list);
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const addFavorite = (recipe) => {
    console.log("Add to favorites:", recipe.title);
    setSelectedRecipe(recipe);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRecipe(null);
  };

  const filterByMealType = (mealType) => {
    return recipe_list.filter((recipe) => recipe.mealType === mealType);
  };

  const MealSection = ({ mealType }) => (
    <>
      <h3
        style={{ marginBottom: "20px", marginTop: "20px", textAlign: "left" }}
      >
        {mealType}
      </h3>
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
                Recipe
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div className="container" id="recipe-body">
      <h1 style={{ textAlign: "center" }}>Recipes</h1>
      <MealSection mealType="Breakfast" />
      <MealSection mealType="Lunch" />
      <MealSection mealType="Dinner" />

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedRecipe && selectedRecipe.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRecipe && (
            <>
              <h5>Ingredients:</h5>
              <ul>
                {selectedRecipe.recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
              <h5>Instructions:</h5>
              <ol>
                {selectedRecipe.recipe.instructions.map(
                  (instruction, index) => (
                    <li key={index}>{instruction}</li>
                  )
                )}
              </ol>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Recipe;
