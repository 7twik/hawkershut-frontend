// eslint-disable-next-line
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../pages/Navbar/Navbar";
import "./loginc.css";

const Login = (props) => {
  const [passShow, setPassShow] = useState(false);

  const [inpval, setInpval] = useState({
    email: "",
    password: "",
  });

  const history = useNavigate();

  const setVal = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;

    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  const loginuser = async (e) => {
    e.preventDefault();

    const { email, password } = inpval;
    console.log(inpval)
    if (email === "") {
      toast.error("email is required!", {
        position: "top-center",
      });
    } else if (!email.includes("@")) {
      toast.warning("includes @ in your email!", {
        position: "top-center",
      });
    } else if (password === "") {
      toast.error("password is required!", {
        position: "top-center",
      });
    } else if (password.length < 6) {
      toast.error("password must be 6 char!", {
        position: "top-center",
      });
    } else {
      const data = await fetch(
        "https://hawkerhut-back.onrender.com/login",
        {
          method: "GET",
        }
      );
      let f = 0;
      let userna = "";
      const res = await data.json();
      console.log(res);
      const datqa = res.userValid;
      if (res.status === 201) {
        for (let i = 0; i < datqa.length; i++) {
          console.log();
          if (datqa[i].email === email) {
            f = 3;
            if (datqa[i].password === password) {
              userna = datqa[i].fname;
              f = 1;
            }
          }
        }

        if (f === 1) {
          const datwa = {
            email: email,
            user: userna,
          };
          // await props.succes(datwa);
          // localStorage.setItem("usersdatatoken", datwa);
          // history("/dash");
          // setInpval({ ...inpval, email: "", password: "" });
        }
        // localStorage.setItem("usersdatatoken", res.result.token);
        // history("/dash");
        // setInpval({ ...inpval, email: "", password: "" });
      }
    }
  };

  return (
    <>
      <Navbar />
      {/* <div className="parentdiv">*/}
      {/* <div className="divform1"> 
          <section className="sectionab">
            <div className="form_data logiiin">
              <div className="form_heading">
                <h1 className="topformm">Welcome Back, Log In</h1>
                <p className="topformm2">Hi, we are glad that you are back.</p>
              </div>

              <form>
                <div className="form_input">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    value={inpval.email}
                    onChange={setVal}
                    name="email"
                    id="email"
                    placeholder="Enter Your Email Address"
                  />
                </div>
                <div className="form_input">
                  <label htmlFor="password">Password</label>
                  <div className="two">
                    <input
                      type={!passShow ? "password" : "text"}
                      onChange={setVal}
                      value={inpval.password}
                      name="password"
                      id="password"
                      placeholder="Enter Your password"
                    />
                    <div
                      className="showpass"
                      onClick={() => setPassShow(!passShow)}
                    >
                      {!passShow ? "Show" : "Hide"}
                    </div>
                  </div>
                </div>

                <button className="btn" onClick={loginuser}>
                  Login
                </button>
                <p className="topformm2">
                  Don't have an Account?{" "}
                  <NavLink  className="topformm2" to="/register">Sign Up</NavLink>{" "}
                </p>
              </form>
              <ToastContainer />
            </div>
          </section>
         </div> */}
      {/* </div> */}
      <div className="loginOutDiv">
        <section className="login-section">
          <div className="form-login">
            <div className="form-heading">
            <h1>Welcome Back,Login!</h1>
              <p>We are glad you are back...</p>
            </div>
            <form className="login-form">
              <div className="login-form-input">
                <label className="login-label" htmlFor="email">Email</label>
                <input
                className="login-input"
                  placeholder="Enter your email..."
                  type="email"
                  value={inpval.email}
                  onChange={setVal}
                  name="email"
                  id="email"
                  
                />
              </div>
              <div className="login-form-input">
              <label className="login-label" htmlFor="password">Password</label>
                <input
                className="login-input"
                  placeholder="Enter your password..."
                  type="password"
                  value={inpval.password}
                  onChange={setVal}
                  name="password"
                  id="password"
                />
              </div>
              <button className="login-btn" onClick={loginuser}>Login</button>          
              <p className="topform123">
                  Don't have an Account?{" "}
                  <NavLink  to="/register">SignUp</NavLink>{" "}
                </p>
            </form>
            <ToastContainer />
          </div>
        </section>
      </div>
    </>
  );
};

export default Login;
