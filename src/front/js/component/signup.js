import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/signup.css";

export default function Signup() {
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    // State initialization
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        age: "",
        height: "",
        weight: "",
        activityLevel: "Very Active"
    });

    const [loginError, setLoginError] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignup = async () => {
        try {
            await actions.signUp(formData, () => {
                navigate("/login");
            });
        } catch (error) {
            setLoginError("Failed to sign up: " + error.message);
        }
    };

    return (
        <div className="signup-container">
            {/* <img src="https://i.ibb.co/SxwrfCJ/grapefruit-1.png" alt=" Image" className="signup-image"></img> */}
            <div className="signup-content">
                <h2 className="signup-heading">Join Us</h2>
                <p className="signup-subheading">Welcome! Join us by signing up below.</p>
                <form className="signup-form">
                    <div className="signup-form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} />
                    </div>
                    <div className="signup-form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
                    </div>
                    <div className="signup-form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} />
                    </div>
                    <div className="signup-form-group">
                        <label htmlFor="age">Age</label>
                        <input type="number" id="age" name="age" value={formData.age} onChange={handleInputChange} />
                    </div>
                    <div className="signup-form-group">
                        <label htmlFor="height">Height (in cm)</label>
                        <input type="number" id="height" name="height" value={formData.height} onChange={handleInputChange} />
                    </div>
                    <div className="signup-form-group">
                        <label htmlFor="weight">Weight (in kg)</label>
                        <input type="number" id="weight" name="weight" value={formData.weight} onChange={handleInputChange} />
                    </div>
                    <div className="signup-form-group">
                        <label htmlFor="activityLevel">Activity Level:</label>
                        <select id="activityLevel" name="activityLevel" value={formData.activityLevel} onChange={handleInputChange}>
                            <option value="Very Active">Very Active</option>
                            <option value="Less">Less</option>
                            <option value="None">None</option>
                            <option value="Disabled">Disabled</option>
                        </select>
                    </div>
                    {loginError && <p className="signup-error-message">{loginError}</p>}
                    <div className="signup-button-group">
                        <button className="signup-btn" onClick={handleSignup}>Sign up</button>
                    </div>
                </form>
                <p className="signup-login-link">Already a member? <span className="signup-text-primary" onClick={() => navigate('/login')}>Log in</span></p>
            </div>
        </div>
    );
}



// import React, { useState, useContext } from "react";
// import { Context } from "../store/appContext";
// import { useNavigate } from "react-router-dom";
// import "../../styles/signup.css"; // Import CSS file

// export default function Signup() {
//     const { actions } = useContext(Context);
//     const navigate = useNavigate();

//     // State initialization
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [age, setAge] = useState("");
//     const [height, setHeight] = useState("");
//     const [weight, setWeight] = useState("");
//     const [activityLevel, setActivity] = useState("");

//     const [loginError, setLoginError] = useState("");

//     const handleSignup = async () => {
//         const form = { name, email, password, age, height, weight, activityLevel };
//         try {
//             await actions.signUp(form, () => {
//                 navigate("/login");
//             });
//         } catch (error) {
//             setLoginError("Failed to sign up: " + error.message);
//         }
//     };

//     return (
//         <div className="signup">
//             <div className="sign-background"></div>
//             <div className="signup-overlay"></div>
//             <div className="signup-content">
//                 <h3 className="cta">Join Us</h3>
//                 <p style={{ color: 'white' }}>Welcome! Join us by signing up below.</p>
//                 <div className="input-group">
//                     <p>Name</p>
//                     <input type="name" className="input-field" name="name" onChange={(e) => setName(e.target.value)} value={name} />
//                 </div>
//                 <div className="input-group">
//                     <p>Email</p>
//                     <input type="email" className="input-field" name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
//                 </div>
//                 <div className="input-group">
//                     <p>Password</p>
//                     <input type="password" className="input-field" onChange={(e) => setPassword(e.target.value)} value={password} />
//                 </div>
//                 <div className="input-group">
//                     <p>Age</p>
//                     <input type="number" className="input-field" onChange={(e) => setAge(e.target.value)} value={age} />
//                 </div>
//                 <div className="input-group">
//                     <p>Height (in cm)</p>
//                     <input type="number" className="input-field" onChange={(e) => setHeight(e.target.value)} value={height} />
//                 </div>
//                 <div className="input-group">
//                     <p>Weight (in kg)</p>
//                     <input type="number" name="weight" className="input-field" onChange={(e) => setWeight(e.target.value)} value={weight} />
//                 </div>
//                 <div className="input-group">
//                     <p>Activity Level:</p>
//                     <select className="input-field" name="activityLevel" value={activityLevel} onChange={(e) => setActivity(e.target.value)}>
//                         <option value="Very Active">Very Active</option>
//                         <option value="Less">Less</option>
//                         <option value="None">None</option>
//                         <option value="Disabled">Disabled</option>
//                     </select>
//                 </div>
//                 {loginError && <p className="error-message">{loginError}</p>}
//                 <div className="button-group">
//                     <button className="btn" onClick={handleSignup}>Sign up</button>
//                 </div>
//                 <p>Already a member? <span className="text-primary" onClick={() => navigate('/login')}>Log in</span></p>
//             </div>
//         </div>
//     );
// };
