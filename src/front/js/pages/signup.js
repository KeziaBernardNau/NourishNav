import React, { useState, useContext } from "react";
import "../../styles/signup.css";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";


export default function Signup() {
  const { store, actions } = useContext(Context);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");
  console.log(token);
  const handleClick = (e) => {
    e.preventDefault();
    console.log(e.target);
    actions.createUser(name, email, password).then((res) => navigate("/profile")).catch((err) => setError(err));
  }
    return (
        <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          type={"text"}
          placeholder="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <button>
          <Link to="/register">Create an account</Link>
        </button>
        <button>
          <Link to="/forgot">Forgot Password</Link>
        </button>
      </form>
    );
  }
  