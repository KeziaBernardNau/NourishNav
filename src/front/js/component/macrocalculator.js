import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/macrocalculator.css"; 

export const Macrocalculator = () => {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [dietType, setDietType] = useState("");
    const [showModal, setShowModal] = useState(false); 

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
            setResult(data);
            setError(null);
            setShowModal(true); 
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

    let content = null;

    if (result) {
        content = (
            <div>
                {dietType === "balance" && (
                    <div>
                        <p>Calorie Recommendation: {result.data?.calorie.toFixed(2) ?? 'N/A'} calories/day</p>
                        <h4>Balanced Diet:</h4>
                        <p>Protein: {result.data?.balanced?.protein.toFixed(2) ?? 'N/A'} grams</p>
                        <p>Fat: {result.data?.balanced?.fat.toFixed(2) ?? 'N/A'} grams</p>
                        <p>Carbs: {result.data?.balanced?.carbs.toFixed(2) ?? 'N/A'} grams</p>
                    </div>
                )}
                {dietType === "highProtein" && (
                    <div>
                        <p>Calorie Recommendation: {result.data?.calorie.toFixed(2) ?? 'N/A'} calories/day</p>
                        <h4>High Protein Diet:</h4>
                        <p>Protein: {result.data?.highprotein?.protein.toFixed(2) ?? 'N/A'} grams</p>
                        <p>Fat: {result.data?.highprotein?.fat.toFixed(2) ?? 'N/A'} grams</p>
                        <p>Carbs: {result.data?.highprotein?.carbs.toFixed(2) ?? 'N/A'} grams</p>
                    </div>
                )}
                {dietType === "lowCarb" && (
                    <div>
                        <p>Calorie Recommendation: {result.data?.calorie.toFixed(2) ?? 'N/A'} calories/day</p>
                        <h4>Low Carbs Diet:</h4>
                        <p>Protein: {result.data?.lowcarbs?.protein.toFixed(2) ?? 'N/A'} grams</p>
                        <p>Fat: {result.data?.lowcarbs?.fat.toFixed(2) ?? 'N/A'} grams</p>
                        <p>Carbs: {result.data?.lowcarbs?.carbs.toFixed(2) ?? 'N/A'} grams</p>
                    </div>
                )}
                {dietType === 'lowFat' && (
                    <div>
                        <p>Calorie Recommendation: {result.data?.calorie.toFixed(2) ?? 'N/A'} calories/day</p>
                        <h4>Low Fat Diet:</h4>
                        <p>Protein: {result.data?.lowfat?.protein.toFixed(2) ?? 'N/A'} grams</p>
                        <p>Fat: {result.data?.lowfat?.fat.toFixed(2) ?? 'N/A'} grams</p>
                        <p>Carbs: {result.data?.lowfat?.carbs.toFixed(2) ?? 'N/A'} grams</p>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="macro-calculator-container">
            <div id="macro" className="macro-calculator-form">
                <h2>Macro Calculator</h2>
                <input type="number" name="age" placeholder="Age" value={userInput.age} onChange={handleChange} className="form-control rounded-3" />
                <input type="text" name="gender" placeholder="Gender (male/female)" value={userInput.gender} onChange={handleChange} className="form-control rounded-3" />
                <input type="number" name="height" placeholder="Height (cm)" value={userInput.height} onChange={handleChange} className="form-control rounded-3" />
                <input type="number" name="weight" placeholder="Weight (kg)" value={userInput.weight} onChange={handleChange} className="form-control rounded-3" />
                <input type="number" name="activitylevel" placeholder="Activity Level (1-5)" value={userInput.activitylevel} onChange={handleChange} className="form-control rounded-3" />
                <select name="goal" value={userInput.goal} onChange={handleChange} className="form-select rounded-3">
                    <option value="">Select Goal</option>
                    <option value="maintain">Maintain Weight</option>
                    <option value="mildlose">Mild Weight Loss</option>
                    <option value="weightlose">Weight Loss</option>
                    <option value="extremelose">Extreme Weight Loss</option>
                    <option value="mildgain">Mild Weight Gain</option>
                    <option value="weightgain">Weight Gain</option>
                    <option value="extremegain">Extreme Weight Gain</option>
                </select>
                <select name="dietType" value={dietType} onChange={(e) => setDietType(e.target.value)} className="form-select rounded-3">
                    <option value="">Select Diet</option>
                    <option value="balance">Balanced Diet</option>
                    <option value="highProtein">High Protein Diet</option>
                    <option value="lowCarb">Low Carbs Diet</option>
                    <option value="lowFat">Low Fat Diet</option>
                </select>
                <button onClick={fetchData} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Calculate
                </button>
            </div>
            <div className={`modal fade ${showModal ? 'show' : ''}`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Result</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            {content}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShowModal(false)}>Close</button>
                        </div>
                    </div>
                </div>
            </div>

            {error && (
                <div style={{ color: "red" }}>
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
};