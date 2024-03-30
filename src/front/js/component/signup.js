import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    // State initialization
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [activity, setActivity] = useState("");

    const [loginError, setLoginError] = useState("");

    const handleSignup = async () => {
        try {
            await actions.signUp({ email, password, age, height, weight, activity });
            navigate("/profile");
        } catch (error) {
            setLoginError("Failed to sign up: " + error.message);
        }
    };

    return (
        <div className="text-left">
            <h3>Join Us</h3>
            <p>Welcome! Join us by signing up below.</p>
            {/* Input fields */}
            <p>Email</p>
            <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
            <p>Password</p>
            <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
            <p>Age</p>
            <input type="number" onChange={(e) => setAge(e.target.value)} value={age} />
            <p>Height (in cm)</p>
            <input type="number" onChange={(e) => setHeight(e.target.value)} value={height} />
            <p>Weight (in kg)</p>
            <input type="number" onChange={(e) => setWeight(e.target.value)} value={weight} />
            <p>Activity Level:</p>
            <select value={activity} onChange={(e) => setActivity(e.target.value)}>
                <option value="Very Active">Very Active</option>
                <option value="Less">Less</option>
                <option value="None">None</option>
                <option value="Disabled">Disabled</option>
            </select>
            {loginError && <p className="text-danger">{loginError}</p>}
            <button onClick={handleSignup} className="btn btn-secondary">Sign up</button>
            <p>Already a member? <span className="text-primary" style={{ cursor: 'pointer' }} onClick={() => navigate('/login')}>Log in</span></p>
        </div>
    );
};
