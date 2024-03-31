import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/profileview.css";


const Private = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [file, setFile] = useState("")

  const handleChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]))
  }

  console.log(store.user)

  useEffect(() => {
    updateFunction();
  }, [file])

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
      <h1>Hello!</h1>
      {store.user && (
        <div>
          <h2>Email: {store.user.email}</h2>
        </div>
      )}
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3 sidebar">
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link active" href="#">Macro Tracker</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Recipes</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Settings</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Upgrade</a>
              </li>
              {/* Add more sidebar options as needed */}
            </ul>
          </div>

          <div className="col-md-9 main-content">
            <h2>Profile</h2>
            {/* Add upload picture field and input fields for user information */}
          </div>

        </div>
      </div>
      <input type="file" onChange={handleChange} />
      <img src={file} height="300px" width="300px" />
    </div>
  );
};

export default Private;