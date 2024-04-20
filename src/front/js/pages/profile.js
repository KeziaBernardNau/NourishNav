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

  const updateUser = () => {
    actions.updateUser(userDetails);
  };

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
    document.getElementById("fileInput").click();
  };

  return (
    <div className="profile-view container mt-5">
      <div className="row">
        <h1
          style={{
            textAlign: "center",
            color: "#2e8540",
            fontFamily: "Arial",
            fontSize: "45px",
          }}
        >
          Profile
        </h1>
        <div className="col-md-3">
          <div className="sidebar">
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
              marginLeft: "15px",
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
                    <FontAwesomeIcon icon={faPlusCircle} />
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
                  <option value="Very Active">Very Active</option>
                  <option value="Less Active">Less Active</option>
                  <option value="Not Active">Not Active</option>
                  <option value="Disabled">Disabled</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="inputCurrentTrack" className="form-label">
                  Current Track
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputCurrentTrack"
                  name="currentTrack"
                  value={userDetails.currentTrack}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="selectDietaryPreference" className="form-label">
                  Dietary Preferences
                </label>
                <select
                  className="form-control"
                  id="selectDietaryPreference"
                  name="dietaryPreference"
                  value={userDetails.dietaryPreference}
                  onChange={handleChange}
                >
                  <option value="">Select...</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Gluten-Free">Gluten-Free</option>
                  <option value="Keto">Keto</option>
                  <option value="Paleo">Paleo</option>
                  <option value="No Restrictions">No Restrictions</option>
                </select>
              </div>
              <button
                type="button"
                onClick={updateUser}
                className="btn btn-primary"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Private;