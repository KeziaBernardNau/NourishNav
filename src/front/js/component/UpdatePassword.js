import React, { useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { Context } from "../store/appContext";

export default function UpdatePassword() {
  const { store, actions } = useContext(Context);
  const [password, setPassword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  
  let token = searchParams.get("token")

  const handleClick = (e) => {
    e.preventDefault();
    actions.changePassword(token, password)

  };
  return (
    <div>
      <div>
        <form className="loginForm" onSubmit={handleClick}>
          <h1>New Password</h1>
          <div className="input-field">
            <input
              className="myInput"
              type={"password"}
              placeholder={"Password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Update Password</button>
        </form>
      </div>
    </div>
  );
}