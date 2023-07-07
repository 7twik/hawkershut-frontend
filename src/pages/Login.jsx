import axios from "axios";
import { useRef, useState } from "react";
import "./login.css";

export default function Login({ setShowLogin, setCurrentUsername, myStorage }) {
  const [error, setError] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const res = await axios.post(
        "https://hawkerhut-back.onrender.com/api/users/login",
        user
      );
      setCurrentUsername(res.data.username);
      myStorage.setItem("user", res.data.username);
      setShowLogin();
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="loginContainer">
      <div className="formHawker">
        <input autoFocus placeholder="username" ref={usernameRef} />
        <input
          type="password"
          min="6"
          placeholder="password"
          ref={passwordRef}
        />
        <button className="loginBtn" onClick={handleSubmit}>
          Login
        </button>
        {error && <span className="failure">Something went wrong!</span>}
      </div>
    </div>
  );
}
