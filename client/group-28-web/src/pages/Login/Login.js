import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login({ ...props }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Logging in...");
    const payload = {
      username: username,
      password: password,
    };
    try {
      // let response = await axios.post("http://localhost:3001/login", payload);
      window.sessionStorage.setItem("username", username);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            name="username"
            value={username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}
