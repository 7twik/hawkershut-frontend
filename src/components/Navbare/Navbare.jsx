import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbare.css";
//import { bars } from '@fortawesome/free-solid-svg-icons';
  ///////////////////////////////////HOMEPAGE NAVBAR /////////////////
import { BsFillHddStackFill } from "react-icons/bs";
const Navbare = (props) => {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };
  function logout() {
    window.location.reload();
  }
function home(){
    props.changeTab(0);
}
function current(){
  props.changeTab(1);
}
function past(){
  props.changeTab(2);
}

  return (
    <div className="nav-sticky">
      <nav className="navbar">
        <div className="container">
          <div className="logo">
            <NavLink to="/">
              <img
                className="logN"
                src="./Logo.png"
                // src="https://res.cloudinary.com/dqy7m95yz/image/upload/v1677352785/icon2_1_pdxuih.png"
                alt="nf"
              />
            </NavLink>
            {/* <img className='logN' src="https://res.cloudinary.com/dcyfkgtgv/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1672838305/Dark_Beige_Modern_Real_Estate_Building_Logo-removebg-preview_xx8tar.jpg" alt="nf" /> */}
          </div>
          <div className="menu-icon" onClick={handleShowNavbar}>
            <BsFillHddStackFill />
          </div>
          <div className={`nav-elements  ${showNavbar && "active"}`}>
            <ul>
              <li className="hov">Welcome {props.user},</li>

              
              <li className="hov" onClick={home}>
                Home
              </li>
              <li className="hov" onClick={current}>
                Current Orders
              </li>
              <li className="hov" onClick={past}>
                Past Orders
              </li>
              <li className="hov">
                <NavLink to="/contact">Contact</NavLink>
              </li>

              <li className="hov">
                <div className="abt"
                  onClick={() => {
                    const element = document.getElementById("about");
                    element.scrollIntoView();
                  }}
                >
                  About
                </div>
              </li>
              <li className="hov">
                <NavLink to="/" onClick={props.logout}>
                  Logout
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbare;
