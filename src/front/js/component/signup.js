// code with mentor help
import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/signup.css"; 

export default function Signup() {
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [activity_level, setActivity] = useState("");

    const [loginError, setLoginError] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault(); 
        const form = { name, email, password, age, height, weight, activity_level };
        try {
            await actions.signUp(form, () => {
                navigate("/login");
            });
        } catch (error) {
            setLoginError("Failed to sign up: " + error.message);
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-container">
                <div className="signup-image-container">
                    <div className="left-images">
                        <div className="image-wrapper" id="salad">
                            <img src="https://i.ibb.co/BsfNKKv/saladbowl1.png" alt="Salad Bowl" />
                        </div>
                        <div className="image-wrapper" id="avocado">
                            <img src="https://i.ibb.co/3yR2CpP/avocado.png" alt="Avocado" />
                        </div>
                    </div>
                    <div className="signup-content">
                        <h2 className="signup-heading">Join Us</h2>
                        <p>Welcome! Join us by signing up below.</p>
                        <form className="signup-form" onSubmit={handleSignup}>
                            <div className="input-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" className="input-field" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="input-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="input-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="input-group">
                                <label htmlFor="age">Age</label>
                                <input type="number" id="age" className="input-field" value={age} onChange={(e) => setAge(e.target.value)} />
                            </div>
                            <div className="input-group">
                                <label htmlFor="height">Height (in cm)</label>
                                <input type="number" id="height" className="input-field" value={height} onChange={(e) => setHeight(e.target.value)} />
                            </div>
                            <div className="input-group">
                                <label htmlFor="weight">Weight (in kg)</label>
                                <input type="number" id="weight" className="input-field" value={weight} onChange={(e) => setWeight(e.target.value)} />
                            </div>
                            <div className="input-group">
                                <label htmlFor="activityLevel">Activity Level</label>
                                <select id="activityLevel" className="input-field" value={activity_level} onChange={(e) => setActivity(e.target.value)}>
                                    <option value="Very Active">Very Active</option>
                                    <option value="Less Active">Less Active</option>
                                    <option value="None">None</option>
                                    <option value="Disabled">Disabled</option>
                                </select>
                            </div>
                            {loginError && <p className="error-message">{loginError}</p>}
                            <div className="button-group">
                                <button type="submit" className="btn">Sign up</button>
                            </div>
                            <p>Already a member? <span className="text-primary" onClick={() => navigate('/login')}>Log in</span></p>
                        </form>
                    </div>
                    <div className="right-images">
                        <div className="image-wrapper" id="grapefruit">
                            <img src="https://i.ibb.co/7tVpxPW/signup-image1.png" alt="Grapefruit" />
                        </div>
                        <div className="image-wrapper" id="cookie">
                            <img src="https://i.ibb.co/ZYTZdN1/cookies-1-1.png" alt="Cookie" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


// code as of 4/15
// import React, { useState, useContext } from "react";
// import { Context } from "../store/appContext";
// import { useNavigate } from "react-router-dom";
// import "../../styles/signup.css"; 

// export default function Signup() {
//     const { actions } = useContext(Context);
//     const navigate = useNavigate();

//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [age, setAge] = useState("");
//     const [height, setHeight] = useState("");
//     const [weight, setWeight] = useState("");
//     const [activity_level, setActivity] = useState("");

//     const [loginError, setLoginError] = useState("");

//     const handleSignup = async (e) => {
//         e.preventDefault(); 
//         const form = { name, email, password, age, height, weight, activity_level };
//         try {
//             await actions.signUp(form, () => {
//                 navigate("/login");
//             });
//         } catch (error) {
//             setLoginError("Failed to sign up: " + error.message);
//         }
//     };

//     return (
//         <div className="signup-page">
//             <div className="signup-container">
//                 <div className="signup-image-container">
//                     <div className="left-images">
//                         <div className="image-wrapper" id="salad">
//                             <img src="https://i.ibb.co/BsfNKKv/saladbowl1.png" alt="Salad Bowl" />
//                         </div>
//                         <div className="image-wrapper" id="avocado">
//                             <img src="https://i.ibb.co/3yR2CpP/avocado.png" alt="Avocado" />
//                         </div>
//                     </div>
//                     <div className="signup-content">
//                         <h2 className="signup-heading">Join Us</h2>
//                         <p>Welcome! Join us by signing up below.</p>
//                         <form className="signup-form" onSubmit={handleSignup}>
//                             <div className="input-group">
//                                 <label htmlFor="name">Name</label>
//                                 <input type="text" id="name" className="input-field" value={name} onChange={(e) => setName(e.target.value)} />
//                             </div>
//                             <div className="input-group">
//                                 <label htmlFor="email">Email</label>
//                                 <input type="email" id="email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} />
//                             </div>
//                             <div className="input-group">
//                                 <label htmlFor="password">Password</label>
//                                 <input type="password" id="password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} />
//                             </div>
//                             <div className="input-group">
//                                 <label htmlFor="age">Age</label>
//                                 <input type="number" id="age" className="input-field" value={age} onChange={(e) => setAge(e.target.value)} />
//                             </div>
//                             <div className="input-group">
//                                 <label htmlFor="height">Height (in cm)</label>
//                                 <input type="number" id="height" className="input-field" value={height} onChange={(e) => setHeight(e.target.value)} />
//                             </div>
//                             <div className="input-group">
//                                 <label htmlFor="weight">Weight (in kg)</label>
//                                 <input type="number" id="weight" className="input-field" value={weight} onChange={(e) => setWeight(e.target.value)} />
//                             </div>
//                             <div className="input-group">
//                                 <label htmlFor="activityLevel">Activity Level</label>
//                                 <select id="activityLevel" className="input-field" value={activity_level} onChange={(e) => setActivity(e.target.value)}>
//                                     <option value="Very Active">Very Active</option>
//                                     <option value="Less Active">Less Active</option>
//                                     <option value="None">None</option>
//                                     <option value="Disabled">Disabled</option>
//                                 </select>
//                             </div>
//                             {loginError && <p className="error-message">{loginError}</p>}
//                             <div className="button-group">
//                                 <button type="submit" className="btn">Sign up</button>
//                             </div>
//                             <p>Already a member? <span className="text-primary" onClick={() => navigate('/login')}>Log in</span></p>
//                         </form>
//                     </div>
//                     <div className="right-images">
//                         <div className="image-wrapper" id="grapefruit">
//                             <img src="https://i.ibb.co/7tVpxPW/signup-image1.png" alt="Grapefruit" />
//                         </div>
//                         <div className="image-wrapper" id="cookie">
//                             <img src="https://i.ibb.co/ZYTZdN1/cookies-1-1.png" alt="Cookie" />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }


// import React, { useState, useContext, useEffect } from "react";
// import { Context } from "../store/appContext";
// import { useNavigate } from "react-router-dom";
// import "../../styles/signup.css";

// export default function Signup() {
//   const { actions } = useContext(Context);
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     age: "",
//     height: "",
//     weight: "",
//     activityLevel: "Very Active",
//   });

//   const [loginError, setLoginError] = useState("");

//   const [signupHeading, setSignupHeading] = useState("Join Us");

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       const texts = [
//         "Take charge of your health.",
//         "Nourish your one body.",
//         "Discover the Secrets of Your Plate!"
//       ];
//       const nextIndex = texts.findIndex(text => text === signupHeading) + 1;
//       const newText = texts[nextIndex % texts.length];
//       setSignupHeading(newText);
//     }, 3000); 

//     return () => clearTimeout(timer);
//   }, [signupHeading]);


//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSignup = async () => {
//     try {
//       await actions.signUp(formData, () => {
//         navigate("/login");
//       });
//     } catch (error) {
//       setLoginError("Failed to sign up: " + error.message);
//     }
//   };

//   return (
//     <div className="signup-page">
//       <div className="signup-container">
//         <div className="signup-image-container">
//           <div className="left-images">
//             <div className="image-wrapper" id="salad">
//               <img
//                 src="https://i.ibb.co/BsfNKKv/saladbowl1.png"
//                 alt="image of salad bowl"
//               />
//             </div>
//             <div className="image-wrapper" id="avocado">
//               <img
//                 src="https://i.ibb.co/3yR2CpP/avocado.png"
//                 alt="image of avocado"
//               />
//             </div>
//           </div>
//           <div className="signup-content">
//           <h2 className="signup-heading">{signupHeading}</h2>
//             <p>Welcome! Join us by signing up below.</p>
//             <form className="signup-form">
//               <div className="signup-form-group">
//                 <label htmlFor="name">Name</label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   className="input-field" // Added class for styling
//                 />
//               </div>
//               <div className="signup-form-group">
//                 <label htmlFor="email">Email</label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className="input-field" // Added class for styling
//                 />
//               </div>
//               <div className="signup-form-group">
//                 <label htmlFor="password">Password</label>
//                 <input
//                   type="password"
//                   id="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   className="input-field" // Added class for styling
//                 />
//               </div>
//               <div className="signup-form-group">
//                 <label htmlFor="age">Age</label>
//                 <input
//                   type="number"
//                   id="age"
//                   name="age"
//                   value={formData.age}
//                   onChange={handleInputChange}
//                   className="input-field" // Added class for styling
//                 />
//               </div>
//               <div className="signup-form-group">
//                 <label htmlFor="height">Height (in cm)</label>
//                 <input
//                   type="number"
//                   id="height"
//                   name="height"
//                   value={formData.height}
//                   onChange={handleInputChange}
//                   className="input-field" // Added class for styling
//                 />
//               </div>
//               <div className="signup-form-group">
//                 <label htmlFor="weight">Weight (in kg)</label>
//                 <input
//                   type="number"
//                   id="weight"
//                   name="weight"
//                   value={formData.weight}
//                   onChange={handleInputChange}
//                   className="input-field" // Added class for styling
//                 />
//               </div>
//               <div className="signup-form-group">
//                 <label htmlFor="activityLevel">Activity Level:</label>
//                 <select
//                   id="activityLevel"
//                   name="activityLevel"
//                   value={formData.activityLevel}
//                   onChange={handleInputChange}
//                   className="input-field" // Added class for styling
//                 >
//                   <option value="Very Active">Very Active</option>
// <option value="Less">Less</option> {/* Should this be "Less Active"? */}
// <option value="None">None</option> 
// <option value="Disabled">Disabled</option>

//                 </select>
//               </div>
//               {loginError && <p className="signup-error-message">{loginError}</p>}
//               <div className="signup-button-group">
//                 <button className="signup-btn" onClick={handleSignup}>
//                   Sign up
//                 </button>
//               </div>
//             </form>
//             <p className="signup-login-link" style={{ textAlign: "center" }}>
//   Already a member?{" "}
//   <span
//     className="signup-text-success"
//     onClick={() => navigate("/login")}
//     style={{ cursor: "pointer", color: "green" }}
//   >
//     Log in
//   </span>
// </p>
//           </div>
//           <div className="right-images">
//             <div className="image-wrapper" id="grapefruit">
//               <img
//                 src="https://i.ibb.co/7tVpxPW/signup-image1.png"
//                 alt="image of grapefruit"
//               />
//             </div>
//             <div className="image-wrapper" id="cookie">
//               <img
//                 src="https://i.ibb.co/ZYTZdN1/cookies-1-1.png"
//                 alt="image of cookie"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
