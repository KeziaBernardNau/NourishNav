import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/loginpage.css";

export default function Login() {
  const { store, actions } = useContext(Context);
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await actions.login({ email, password });
      navigate("/profile");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="login">
          <div className="login-background"></div>
          <div className="login-overlay"></div>
          <div className="login-content" style={{ marginLeft: "20%" }}>
            <h1 id="banner-title">Login</h1>
            <div className="input-group">
              <input
                className="input-field"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <input
                className="input-field"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button className="btn" id="login-btn" type="submit">
              Login
            </button>
            <div className="link-button">
              <Link to="/ForgotPassword">Forgot Password</Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
