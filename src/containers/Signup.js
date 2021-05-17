import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Signup = ({ onLogin }) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post("http://localhost:27017/user/signup", {
        email: email,
        username: username,
        password: password,
      });
      if (response.data.token) {
        onLogin(response.data.token, response.data.username);
        history.push("/");
      } else {
        alert("Une erreur est survenue.");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div>
          <span>Email</span>
          <input
            placeholder="your.adresse@mail.com"
            onChange={(event) => setEmail(event.target.value)}
            type="text"
          />
        </div>
        <div>
          <span>Username</span>
          <input
            placeholder="Your username"
            onChange={(event) => setUsername(event.target.value)}
            type="text"
          />
        </div>
        <div>
          <span>Password</span>
          <input
            placeholder="Your password"
            onChange={(event) => setPassword(event.target.value)}
            type="text"
          />
        </div>
        <input type="submit" />
      </form>
    </div>
  );
};

export default Signup;
