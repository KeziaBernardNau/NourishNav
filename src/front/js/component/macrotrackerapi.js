import React, { useState } from 'react';

export const Macrotrackerapi = ({ onAdd }) => {
    const [query, setQuery] = useState('');
    const [nutrition, setNutrition] = useState();
    const [mealType, setMealType] = useState('breakfast'); // Default meal type

    async function handleApiCall() {
        let response = await fetch(`https://api.calorieninjas.com/v1/nutrition?query=${query}`, {
            method: 'GET',
            headers: { 'X-Api-Key': 'OE6QCELAPANx8gXvPS3SMQ==tfP3w09EJuTZ6Ahg' },
            contentType: 'application/json',
        });
        let data = await response.json();
        setNutrition(data.items[0]); // Assuming you want the first item
    }

    return (
        <div style={{ minHeight: "50vh", border: "2px solid black", borderRadius: "12.5%", background: "beige" }}>
            <div>Macro Tracker: Enter food here</div>
            <input type="text" onChange={(e) => setQuery(e.target.value)} />
            <select value={mealType} onChange={(e) => setMealType(e.target.value)}>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
            </select>
            <button className="btn btn-primary" onClick={handleApiCall}>Search</button>
            {nutrition && (
                <div>
                    {nutrition ? <div>
				<li>{nutrition.name}</li>
				<li>{nutrition.calories}</li>
				<li>{nutrition.serving_size_g}</li>
				<li>{nutrition.fat_total_g}</li>
				<li>{nutrition.sugar_g}</li>
				<li>{nutrition.fiber_g}</li>
				<li>{nutrition.protein_g}</li>
				<li>{nutrition.cholesterol_mg}</li>
				<li>{nutrition.calories}</li>
				<li>{nutrition.carbohydrates_total_g}</li>
				<li>{nutrition.fat_saturated_g}</li>
				
				<li>{nutrition.sodium_mg}</li>
			</div> : ''}
                    <button onClick={() => onAdd(nutrition, mealType)}>Add to Meal</button>
                </div>
            )}
        </div>
    );
};
