import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Login successful");
        navigate("/User");
      } else {
        alert(data.error || "Login failed");
      }
    } catch (err) {
      console.error("Login error", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="login-section">
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="login-title">Login to Alpha</h2>

        <input
          type="email"
          placeholder="Email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="login-button">
          Login
        </button>

        <p className="login-forgot">Forgot password?</p>
      </form>
    </div>
  );
};
export default Login;
