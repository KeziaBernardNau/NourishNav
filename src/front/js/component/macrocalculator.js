import React, { useState } from "react";

export const Macrocalculator = () => {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const [userInput, setUserInput] = useState({
        age: '',
        gender: '',
        height: '',
        weight: '',
        activitylevel: '',
        goal: ''
    });

    const fetchData = async () => {
        const queryString = Object.keys(userInput)
            .map(key => `${key}=${encodeURIComponent(userInput[key])}`)
            .join('&');
        const url = `https://fitness-calculator.p.rapidapi.com/macrocalculator?${queryString}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'a1b0c2e066mshd837a4a5335ce94p17fdbajsne294abb41532',
                'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`API call failed with status: ${response.status}, ${await response.text()}`);
            }
            const data = await response.json();
            console.log(data)
            setResult(data);
            setError(null);
        } catch (error) {
            setError(error.message);
            setResult(null);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInput(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div>
            <div id="macro" style={{ padding: "20px", border: "2px solid black", borderRadius: "10px", background: "beige" }}>
                <h2>Macro Calculator</h2>
                <input type="number" name="age" placeholder="Age" value={userInput.age} onChange={handleChange} />
                <input type="text" name="gender" placeholder="Gender (male/female)" value={userInput.gender} onChange={handleChange} />
                <input type="number" name="height" placeholder="Height (cm)" value={userInput.height} onChange={handleChange} />
                <input type="number" name="weight" placeholder="Weight (kg)" value={userInput.weight} onChange={handleChange} />
                <input type="number" name="activitylevel" placeholder="Activity Level (1-5)" value={userInput.activitylevel} onChange={handleChange} />
                <select name="goal" value={userInput.goal} onChange={handleChange}>
                    <option value="">Select Goal</option>
                    <option value="maintain">Maintain Weight</option>
                    <option value="mildlose">Mild Weight Loss</option> {/* Updated */}
                    <option value="weightlose">Weight Loss</option> {/* Updated */}
                    <option value="extremelose">Extreme Weight Loss</option>
                    <option value="mildgain">Mild Weight Gain</option> {/* Updated */}
                    <option value="weightgain">Weight Gain</option> {/* Updated */}
                    <option value="extremegain">Extreme Weight Gain</option> {/* Updated */}
                </select>
                <button onClick={fetchData}>Calculate</button>
            </div>
            {result && (
                <div>
                    <h3>Results:</h3>
                    {/* Display the overall calorie recommendation */}
                    <p>Calorie Recommendation: {result.data?.calorie.toFixed(2) ?? 'N/A'} calories/day</p>

                    {/* Display macronutrient distribution for a balanced diet */}
                    <h4>Balanced Diet:</h4>
                    <p>Protein: {result.data?.balanced?.protein.toFixed(2) ?? 'N/A'} grams</p>
                    <p>Fat: {result.data?.balanced?.fat.toFixed(2) ?? 'N/A'} grams</p>
                    <p>Carbs: {result.data?.balanced?.carbs.toFixed(2) ?? 'N/A'} grams</p>

                    {/* Repeat for other diet types */}
                    <h4>High Protein Diet:</h4>
                    <p>Protein: {result.data?.highprotein?.protein.toFixed(2) ?? 'N/A'} grams</p>
                    <p>Fat: {result.data?.highprotein?.fat.toFixed(2) ?? 'N/A'} grams</p>
                    <p>Carbs: {result.data?.highprotein?.carbs.toFixed(2) ?? 'N/A'} grams</p>

                    <h4>Low Carbs Diet:</h4>
                    <p>Protein: {result.data?.lowcarbs?.protein.toFixed(2) ?? 'N/A'} grams</p>
                    <p>Fat: {result.data?.lowcarbs?.fat.toFixed(2) ?? 'N/A'} grams</p>
                    <p>Carbs: {result.data?.lowcarbs?.carbs.toFixed(2) ?? 'N/A'} grams</p>

                    <h4>Low Fat Diet:</h4>
                    <p>Protein: {result.data?.lowfat?.protein.toFixed(2) ?? 'N/A'} grams</p>
                    <p>Fat: {result.data?.lowfat?.fat.toFixed(2) ?? 'N/A'} grams</p>
                    <p>Carbs: {result.data?.lowfat?.carbs.toFixed(2) ?? 'N/A'} grams</p>
                </div>
            )}
            {error && (
                <div style={{ color: "red" }}>
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
};
