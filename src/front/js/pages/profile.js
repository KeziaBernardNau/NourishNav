import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/profileview.css";
import { Macrocalculator } from "../component/macrocalculator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const Private = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [userDetails, setUserDetails] = useState({
    email: "",
    name: "",
    weight: "",
    activityLevel: "",
    currentTrack: "",
    dietaryPreference: "",
  });

  useEffect(() => {
    if (!store.user) {
      actions.authenticateUser().catch(() => navigate("/"));
    } else {
      setUserDetails((prevState) => ({
        ...prevState,
        ...store.user,
        name: store.user.name || "",
        email: store.user.email || "",
        weight: store.user.weight || "",
        activity_level: store.user.activity_level || "",
        profilePicture: store.user.profilePicture || "",
      }));
    }
  }, [store.user, actions, navigate]);

  function updateUserProfile() {
    actions.updateUser(userDetails.email, userDetails.weight, userDetails.activity_level, userDetails.name, file)
  }
  const handleFileChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileButtonClick = () => {
    // Trigger the file input click event
    document.getElementById("fileInput").click();
  };
  return (
    <div className="profile-view container mt-5">
      <div className="row">
        <h2>Profile</h2>
        <div className="col-md-3">
          <div className="sidebar">
            {/* Sidebar content */}
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Macro Tracker
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Macro Calculator
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Upgrade
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Settings
                </a>
              </li>
            </ul>
          </div>
          <div className="macro-calculator mt-3">
            <Macrocalculator />
          </div>
        </div>
        <div className="col-md-6">
          <div
            className="profile-content"
            style={{
              backgroundColor: "#f8f9fa",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <div className="text-center mb-3">
              {file && (
                <img src={file} alt="Profile" className="img-thumbnail" />
              )}
              <div className="file-input mt-2">
                <label htmlFor="file-upload" className="file-upload-label">
                  <input
                    id="file-upload"
                    type="file"
                    onChange={handleFileChange}
                    className="form-control d-none"
                  />
                  <span className="plus-sign">
                    <i className="fas fa-plus"></i>
                  </span>
                </label>
              </div>
            </div>
            <form>
              <div className="mb-3">
                <label htmlFor="inputName" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputName"
                  name="name"
                  value={userDetails.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inputEmail" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  name="email"
                  value={userDetails.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inputWeight" className="form-label">
                  Weight
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="inputWeight"
                  name="weight"
                  value={userDetails.weight}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="selectActivityLevel" className="form-label">
                  Activity Level
                </label>
                <select
                  className="form-control"
                  id="selectActivityLevel"
                  name="activityLevel"
                  value={userDetails.activityLevel}
                  onChange={handleChange}
                >
                  <option value="Sedentary">Sedentary</option>
                  <option value="Lightly Active">Lightly Active</option>
                  <option value="Moderately Active">Moderately Active</option>
                  <option value="Very Active">Very Active</option>
                  <option value="Extra Active">Extra Active</option>
                </select>
              </div>
              <div className="mb-3">
                <button type="button" className="btn btn-primary" onClick={updateUserProfile}>
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-3">
          <div>
            {/* Other optional content */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Private;





// import React, { useEffect, useContext, useState } from "react";
// import { Context } from "../store/appContext";
// import { Navigate, useNavigate } from "react-router-dom";
// import { Macrocalculator } from "../component/macrocalculator";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../../styles/profileview.css";

// const Private = () => {
//   const { store, actions } = useContext(Context);
//   const navigate = useNavigate();
//   const [file, setFile] = useState("");
//   const [userDetails, setUserDetails] = useState({
//     email: "",
//     name: "",
//     weight: "",
//     activityLevel: "",
//     currentTrack: "",
//   });

//   useEffect(() => {
//     if (!store.user) {
//       actions.authenticateUser().catch(() => navigate("/"));
//     } else {
//       setUserDetails((prevState) => ({
//         ...prevState,
//         email: store.user.email || "",
//         weight: store.user.weight || "",
//         activityLevel: store.user.activityLevel || "",
//         profilePicture: store.user.profilePicture || "",
//       }));
//     }
//   }, [store.user, actions, navigate]);

//   function updateUser() {
//     actions.updateUser(
//       userDetails.email,
//       userDetails.weight,
//       userDetails.activityLevel,
//       file
//     );
//   }
//   const handleFileChange = (e) => {
//     setFile(URL.createObjectURL(e.target.files[0]));
//   };

//   console.log(store.user);

//   useEffect(() => {
//     updateFunction();
//   }, [file]);

//   const updateFunction = () => {
//     console.log("update function ran");
//     let response = process.env.BACKEND_URL + "";
//   };
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserDetails((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   return (
//     <div className="profile-view">
//        <div className="container text-center">
//       <h2>Edit Profile:</h2>
//       <div style={{ display: "flex" }}>
//         <div
//           className="container-fluid"
//           style={{ width: "30%", postition: "absolute", left: "13%" }}
//         >
//           <div className="row">
//             {/* Sidebar */}
//             <div className="col-md-3 sidebar">
//               <ul className="nav flex-column">
//                 <li className="nav-item">
//                   <a className="nav-link active" href="#">
//                     Macro Tracker
//                   </a>
//                 </li>
//                 <li className="nav-item">
//                   <a className="nav-link" href="#">
//                     Marco Calculator
//                   </a>
//                 </li>
//                 <li className="nav-item">
//                   <a className="nav-link" href="#">
//                     Upgrade
//                   </a>
//                 </li>
//                 <li className="nav-item">
//                   <a className="nav-link" href="#macro">
//                     Settings
//                   </a>
//                 </li>
//                 {/* Add more sidebar options as needed */}
//               </ul>
//             </div>
//           </div>
//         </div>
//         <div
//           style={{
//             height: "100dvh",
//             width: "70%",
//             marginLeft: "35%",
//             paddingBottom: "50%",
//           }}
//         >
//           <div
//             className="col"
//             style={{
//               display: "flex",
//               flexDirection: "column-reverse",
//             }}
//           >
//             <input
//               type="file"
//               onChange={(e) => handleFileChange(e)}
//               style={{
//                 marginLeft: "-70%",
//               }}
//             />
//             <img
//               src={file}
//               height="200px"
//               width="200px"
//               style={{
//                 borderRadius: "50%",
//                 border: "1px solid black",
//                 marginLeft: "-70%",
//               }}
//             />
//           </div>
//           <div className="col">
//             <form
//               style={{
//                 position: "absolute",
//                 top: "20%",
//                 left: "60%",
//                 width: "550px",
//               }}
//             >
//               <div className="mb-3" style={{ width: "50%", paddingTop: "5px" }}>
//                 <label htmlFor="exampleInputName1" className="form-label">
//                   Name
//                 </label>
//                 <input
//                   type="email"
//                   className="form-control"
//                   id="exampleInputName"
//                 />
//               </div>
//               <div className="mb-3" style={{ width: "50%" }}>
//                 <label htmlFor="exampleInputEmail1" className="form-label">
//                   Email
//                 </label>
//                 <input
//                   className="form-control"
//                   id="exampleInputEmail"
//                   aria-describedby="emailHelp"
//                   name="email"
//                   value={userDetails.email}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="mb-3" style={{ width: "50%" }}>
//                 <label htmlFor="exampleInputPassword1" className="form-label">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   className="form-control"
//                   id="exampleInputPassword"
//                 />
//               </div>
//               <div className="mb-3" style={{ width: "50%" }}>
//                 <label htmlFor="exampleInputPassword1" className="form-label">
//                   Weight
//                 </label>
//                 <input
//                   type="number"
//                   className="form-control"
//                   id="exampleInputWeight"
//                   name="weight"
//                   value={userDetails.weight}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="mb-3" style={{ width: "50%" }}>
//                 <label
//                   htmlFor="exampleInputActivityLevel1"
//                   className="form-label"
//                 >
//                   Activity Level
//                 </label>
//                 <select
//                   className="form-control"
//                   id="exampleInputActivityLevel"
//                   name="activityLevel"
//                   value={userDetails.activityLevel}
//                   onChange={handleChange}
//                 >
//                   <option value="Very Active">Very Active</option>
//                   <option value="Less">Less Active</option>
//                   <option value="None">Not Active</option>
//                   <option value="Disabled">Disabled</option>
//                 </select>
//               </div>
//               <div className="mb-3" style={{ width: "50%" }}>
//                 <div class="btn-group">
//                   <button
//                     className="btn btn-secondary btn-sm dropdown-toggle"
//                     type="button"
//                     data-bs-toggle="dropdown"
//                     aria-expanded="false"
//                   >
//                     Dietary Preferences
//                   </button>
//                   <ul className="dropdown-menu">...</ul>
//                 </div>
//               </div>
//               <button
//                 style={{ position: "absolute", right: "110%" }}
//                 type="button"
//                 onClick={() => updateUser()}
//                 className="btn btn-primary"
//               >
//                 Save
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>

//       <Macrocalculator />
//     </div>
//     </div>

//   );
// };

// export default Private;
