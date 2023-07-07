import axios from "axios";
import { useRef, useState } from "react";
import "./register.css";

export default function Register({ setShowRegister }) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {

      await axios.post("https://hawkerhut-back.onrender.com/api/users/register", newUser);
      setError(false);
      setSuccess(true);
      
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="registerContainer">
      {/* <div className="logo">
        <Room className="logoIcon" />
        <span>LamaPin</span>
      </div> */}
      <div className="formHawker">
        <input autoFocus placeholder="username" ref={usernameRef} />
        <input type="email" placeholder="email" ref={emailRef} />
        <input
          type="password"
          min="6"
          placeholder="password"
          ref={passwordRef}
        />
        <button className="registerBtn" onClick={handleSubmit}>
          Register
        </button>
        {success && (
          <span className="success">Successfull. You can login now!</span>
        )}
        {error && <span className="failure">Something went wrong!</span>}
      </div>
      {/* <Cancel
        className="registerCancel"
        onClick={() => setShowRegister(false)}
      /> */}
    </div>
  );
}