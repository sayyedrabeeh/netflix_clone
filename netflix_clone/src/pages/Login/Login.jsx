import React, { useState,useEffect } from 'react';
import './Login.css';
import logo from '../../assets/logo.png';
import netflix_spinner from '../../assets/netflix_spinner.gif';
import { login, signup } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from "../../firebase"

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateInputs = () => {
    if (signState === "Sign Up" && name.trim().length < 3) {
      toast.warning('Name must be at least 3 characters');
      return false;
    }
    if (!email.includes('@') || !email.includes('.')) {
      toast.warning('Please enter a valid email address');
      return false;
    }
    if (password.length < 6) {
      toast.warning('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const user_auth = async (event) => {
    event.preventDefault();
    if (!validateInputs()) return;

    setLoading(true);
    try {
      if (signState === "Sign In") {
        await login(email, password);
        toast.success('Signed in successfully!');
      } else {
        await signup(name, email, password);
        toast.success('Account created successfully!');
      }
      navigate("/Home");
    } catch (err) {
        console.error(err);

        let message = 'An error occurred. Please try again.';

        if (err.code === 'auth/user-not-found') {
          message = 'No user found with this email.';
        } else if (err.code === 'auth/wrong-password') {
          message = 'Incorrect password.';
        } else if (err.code === 'auth/invalid-email') {
          message = 'Email address is not valid.';
        } else if (err.code === 'auth/email-already-in-use') {
          message = 'This email is already registered.';
        } else if (err.code === 'auth/invalid-credential') {
          message = 'Invalid credentials. Please check your login details.';
        } else if (err.message) {
          message = err.message;
        }

        toast.error(message);
        setLoading(false);
    }
    setLoading(false);
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/home', { replace: true });  
      }
    });
    return unsubscribe;
  }, [navigate]);
  return (
    <>
                 <ToastContainer
              position="top-right"   
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
      {
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
      }
    </>
  );
};

export default Login;
