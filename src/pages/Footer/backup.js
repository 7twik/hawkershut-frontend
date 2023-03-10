import React from 'react'
import './footer.css';
import { NavLink } from 'react-router-dom';
import { BsLinkedin } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
const Footer = () => {
  return (
    <div className='totalf'>
      <div className='footT'>
        <div className="leftf">
            <div className='logof'>
            <img className='logF' src="https://res.cloudinary.com/dcyfkgtgv/image/upload/v1673081748/bita-final-removebg-preview_hrfoev.png" alt="nf" />
            </div>
            <div className='leftf-b'>
              <div className='ico'>
              <BsLinkedin />
              </div><div className='ico'>
              <BsTwitter />
              </div><div className='ico'>
              <BsFacebook />
              </div>
            </div>
        </div>
        <div className='middle'>
          <ul>
            <li><span>Company</span></li>
            <li><a href="#/Global">Global Locations</a></li>
            <li><a href="#/Mission">Mission</a></li>
            <li><a href="#/Inclusion">Inclusion & Diversity</a></li>
            <li><a href="#/Investors">Investors</a></li>
            <li><a href="#/Newroom">Newsroom</a></li>
            <li><a href="#/Purpose">Purpose</a></li>
          </ul>
        </div>
        <div className='rightf'>
        <ul>
            <li><span>Partnerships</span></li>
            <li><a href="#/Brokers">Brokers</a></li>
            <li><a href="#/Landlords">Landlords</a></li>
            <li><a href="#/Refer">Refer a friend</a></li>
            <li><a href="#/Event">Event Planners</a></li>
          </ul>
        </div>
        <div className='rightr'>
        <ul>
            <li><span>Support</span></li>
            <li><a href="#/Help">Help center</a></li>
            <li><a href="/AddBlog">Add Blog</a></li>
            <li><a href="#/Contact">Contact Us</a></li>
            <li><a href="#/Covid">Covid Response</a></li>
          </ul>
        </div>
      </div>
      <div className="footB">
          <NavLink to="/projects"> Privacy Policy </NavLink>&nbsp; | &nbsp; <NavLink to="/projects"> Terms & Conditions </NavLink> &nbsp; | &nbsp; <NavLink to="/projects"> Sitemap</NavLink>
      </div>
    </div>
  )
}

export default Footer;