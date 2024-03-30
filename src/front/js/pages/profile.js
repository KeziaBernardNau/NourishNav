import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Private = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (!store.user) {
            actions.authenticateUser()
                .then(() => {
                    // If authentication is successful and user is retrieved,
                    // you can optionally perform additional actions here.
                })
                .catch(() => {
                    // If authentication fails, redirect to home.
                    navigate("/");
                });
        }
    }, [actions, navigate, store.user]);

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
              <a className="nav-link active" href="#">Option 1</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Option 2</a>
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
  );
</div>
    );
};

export default Private;