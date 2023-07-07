import { useState } from 'react';
 import { NavLink } from 'react-router-dom';
import './navbar.css';
//import { bars } from '@fortawesome/free-solid-svg-icons';
//////////////////////LANDING PAGE NAVBAR /////////////////
import { BsFillHddStackFill } from "react-icons/bs";
const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false)

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }
  
  return (
    <div className='nav-sticky'>
    <nav className="navbar">
      <div className="container">
        <div className="logoo">
        <NavLink to="/">
        <img className='logN' src="../../../public/Logo.png" alt="nf" />
        </NavLink>
          {/* <img className='logN' src="https://res.cloudinary.com/dcyfkgtgv/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1672838305/Dark_Beige_Modern_Real_Estate_Building_Logo-removebg-preview_xx8tar.jpg" alt="nf" /> */}
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <BsFillHddStackFill />
        </div>
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
          <ul>
            <li className='hov'>
              <NavLink to="/">
                Home
                </NavLink>
            </li>
            <li className='hov'>
              <NavLink to="/business">Your business</NavLink>
            </li>
            {/* <li className='hov'>
              <NavLink to="/login">Login</NavLink>
            </li> */}
            
            {/* <li className='hov'>
              <NavLink to="/register">SignUp</NavLink>
            </li> */}
            
            {/* <li className='hov'>
              <NavLink to="/">Contact</NavLink>
            </li> */}
           
          </ul>
        </div>
      </div>
    </nav>
    </div>
  )
}

export default Navbar;