import React, { useState } from 'react';
import './Login.css';
import logo from '../../assets/logo.png';
import netflix_spinner from '../../assets/netflix_spinner.gif';
import { login, signup } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const user_auth = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (signState === "Sign In") {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
      navigate("/Home");  
    } catch (err) {
      alert("Authentication failed. Please check your credentials.");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    loading ? (
      <div className="login-spinner">
        <img src={netflix_spinner} alt="loading" />
      </div>
    ) : (
      <div className="login">
        <img src={logo} className="login-logo" alt="Netflix Logo" />
        <div className="login-form">
          <h1>{signState}</h1>
          <form onSubmit={user_auth}>
            {signState === "Sign Up" && (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Your Name"
                required
              />
            )}
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              required
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              required
            />
            <button type="submit">{signState}</button>
            <div className="form-help">
              <div className="remember">
                <input type="checkbox" />
                <label>Remember Me</label>
              </div>
              <p>Need Help?</p>
            </div>
          </form>
          <div className="form-switch">
            {signState === "Sign In" ? (
              <p>New to Netflix? <span onClick={() => setSignState("Sign Up")}>Sign Up Now</span></p>
            ) : (
              <p>Already have an account? <span onClick={() => setSignState("Sign In")}>Sign In Now</span></p>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Login;
