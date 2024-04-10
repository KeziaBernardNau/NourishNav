import React, { useState } from "react";

export default function Forgot() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  // const token = sessionStorage.getItem("token");
  // console.log(token);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const opts = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email
        })
      };
      const res = await fetch(process.env.BACKEND_URL + "/api/forgotpassword", opts);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Something went wrong");
      }
      setSuccess(true);
    } catch (error) {
      setError(error.message || "Something went wrong");
    }
  };
  return (
    <div>
      <form className="loginForm" onSubmit={handleSubmit}>
        <h1>Email</h1>
        <input
          type={"text"}
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Recover Password</button>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">Recovery email sent. Check your inbox</p>}
      </form>
    </div>
  );
}