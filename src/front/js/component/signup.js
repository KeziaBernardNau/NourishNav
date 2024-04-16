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
      <h1>Join Us</h1>
        {/* <div className="left-images">
            <div className="image-wrapper" id="salad">
              <img
                src="https://i.ibb.co/BsfNKKv/saladbowl1.png"
                alt="Salad Bowl"
              />
            </div>
            <div className="image-wrapper" id="avocado">
              <img src="https://i.ibb.co/3yR2CpP/avocado.png" alt="Avocado" />
            </div>
          </div> */}
        <div className="signup-content">
          {/* <h2 className="signup-heading">Join Us</h2> */}
          <p>Welcome! Join us by signing up below.</p>
          <form className="signup-form" onSubmit={handleSignup}>
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className="input-field"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                className="input-field"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="height">Height (in cm)</label>
              <input
                type="number"
                id="height"
                className="input-field"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="weight">Weight (in kg)</label>
              <input
                type="number"
                id="weight"
                className="input-field"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="activityLevel">Activity Level</label>
              <select
                id="activityLevel"
                className="input-field"
                value={activity_level}
                onChange={(e) => setActivity(e.target.value)}
              >
                <option value="Very Active">Very Active</option>
                <option value="Less Active">Less Active</option>
                <option value="None">None</option>
                <option value="Disabled">Disabled</option>
              </select>
            </div>
            {loginError && <p className="error-message">{loginError}</p>}
            <div className="button-group">
              <button type="submit" className="signup-btn">
                Sign up
              </button>
            </div>
            <p>
              Already a member?{" "}
              <span className="text-success" onClick={() => navigate("/login")}>
                Log in
              </span>
            </p>
          </form>
        </div>
        {/* <div className="right-images">
            <div className="image-wrapper" id="grapefruit">
              <img
                src="https://i.ibb.co/7tVpxPW/signup-image1.png"
                alt="Grapefruit"
              />
            </div>
            <div className="image-wrapper" id="cookie">
              <img
                src="https://i.ibb.co/ZYTZdN1/cookies-1-1.png"
                alt="Cookie"
              />
            </div>
          </div> */}
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
