import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../Navbar/Navbar";
import "./mixlog.css";

const BLog = (props) => {
  const [passShow, setPassShow] = useState(false);
    const [successs,setS]=React.useState(false);
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
      // console.log("user login succesfully done");

      const data = await fetch("https://sea-lion-app-6nyh2.ondigitalocean.app/blogin", {
        method: "GET",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        // body: JSON.stringify({
        //   email,
        //   password,
        // }),
      });
      let f=0;
      let userna="";
      const res = await data.json();
      console.log(res);
      const datqa=res.userValid;
      if (res.status === 201) {
        for (let i=0;i<datqa.length;i++)
        {
          console.log()
          if (datqa[i].email===email)
          {
            f=3;
            if (datqa[i].password===password)
            {
              userna=datqa[i].fname;
              f=1;
            }
          }
        }
        
        if (f===1)
        {
            setS(true);
          const datwa={
            email:email,
            user: userna
          }
          props.successs(datwa);
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
    {(successs)?<>done</>:<>
    <Navbar />
      <section className="sectiona">
        <div className="form_data">
          <div className="form_heading">
            <h1>Welcome Back, Log In</h1>
            <p>Hi, we are you glad you are back. Please login.</p>
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
            <p>
              Don't have an Account? <NavLink to="/bregister">Sign Up</NavLink>{" "}
            </p>
          </form>
          <ToastContainer />
        </div>
      </section></>}
    </>
  );
};

export default BLog;
