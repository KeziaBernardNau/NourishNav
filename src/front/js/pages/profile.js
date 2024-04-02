import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Navigate, useNavigate } from "react-router-dom";
import { Macrocalculator } from "../component/macrocalculator";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/profileview.css";

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

  });

  useEffect(() => {
    if (!store.user) {
      actions.authenticateUser().catch(() => navigate("/"));
    } else {
      setUserDetails(prevState => ({
        ...prevState,
        email: store.user.email || "",
        weight: store.user.weight || "",
        activityLevel: store.user.activityLevel || "",
      }));
    }
  }, [store.user, actions, navigate]);

  function updateUser() {
    actions.updateUser(userDetails.email, userDetails.weight, userDetails.activityLevel, file)
  }
  const handleFileChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  console.log(store.user);

  useEffect(() => {
    updateFunction();
  }, [file]);

  const updateFunction = () => {
    console.log("update function ran");
    let response = process.env.BACKEND_URL + "";
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // useEffect(() => {
  //     if (!store.user) {
  //         actions.authenticateUser()
  //             .then(() => {
  //                 // If authentication is successful and user is retrieved,
  //                 // you can optionally perform additional actions here.
  //             })
  //             .catch(() => {
  //                 // If authentication fails, redirect to home.
  //                 navigate("/");
  //             });
  //     }
  // }, [actions, navigate, store.user]);

  return (
    <div className="container text-center">
      <h2>Edit Profile:</h2>
      <div style={{ display: "flex" }}>
        {store.user && (
          <div>
            <h2>Email: {store.user.email}</h2>
          </div>
        )}
        <div className="container-fluid" style={{ width: "30%", marginLeft: 0 }}>
          <div className="row">
            {/* Sidebar */}
            <div className="col-md-3 sidebar">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a className="nav-link active" href="#">Macro Tracker</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Marco Calculator</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Upgrade</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#macro">Settings</a>
                </li>
                {/* Add more sidebar options as needed */}
              </ul>
            </div>
          </div>
        </div>
        <div style={{ height: "100dvh", width: "70%" }}>
          <div style={{
            display: "flex",
            flexDirection: "column-reverse",
          }}>
            <input type="file" onChange={handleChange} />
            <img src={file} height="200px" width="200px" style={{ borderRadius: "50%", border: "1px solid black" }} />
          </div>
          <div>
            <form>
              <div className="mb-3" style={{ width: "50%", paddingTop: "5px" }}>
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={userDetails.email} onChange={handleChange} />
              </div>
              <div className="mb-3" style={{ width: "50%" }}>
                <label htmlFor="exampleInputPassword1" className="form-label">Name</label>
                <input type="password" className="form-control" id="exampleInputName" />
              </div>
              <div className="mb-3" style={{ width: "50%" }}>
                <label htmlFor="exampleInputPassword1" className="form-label">Weight</label>
                <input type="number" className="form-control" id="exampleInputWeight" name="weight" value={userDetails.weight} onChange={handleChange} />
              </div>
              <div className="mb-3" style={{ width: "50%" }}>
                <label htmlFor="exampleInputPassword1" className="form-label">Activity Level</label>
                <input type="password" className="form-control" id="exampleInputActivityLevel" name="activityLevel" value={userDetails.activityLevel} onChange={handleChange} />
                <select className="form-control" id="exampleInputActivityLevel" name="activityLevel" value={userDetails.activityLevel} onChange={handleChange}>
                  <option value="Very Active">Very Active</option>
                  <option value="Less">Less Active</option>
                  <option value="None">Not Active</option>
                  <option value="Disabled">Disabled</option>
                </select>
              </div>
              <div className="mb-3" style={{ width: "50%" }}>
                <label htmlFor="exampleInputPassword1" className="form-label">Current Track</label>
                <input type="password" className="form-control" id="exampleInputCurrentTrack" />
              </div>
              <div className="mb-3" style={{ width: "50%" }}>
                <div class="btn-group">
                  <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dietary Preferences
                  </button>
                  <ul className="dropdown-menu">
                    ...
                  </ul>
                </div>
              </div>
              <div className="btn-group">
                <button className="btn btn-secondary btn-sm" type="button"></button>
              </div>
              <button type="submit" onClick={() => updateUser()} className="btn btn-primary">Save</button>
            </form>
          </div>
        </div>
      </div>


      <Macrocalculator />
    </div >
  );
};

export default Private;