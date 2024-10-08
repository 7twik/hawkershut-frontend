import './Footer.css';

function Footer() {
  return (
    <div className="Footer">
        <div className='text-box'>
            <div className="logo-element">
            <img className='logo' src="../../../public/Logo.png" alt=''/>
            </div>
              <div className='about-section'>
                <div className='about'>About</div>
                <div className='about-content'><a href='#who'>Who Are We?</a></div>
                {/* <div className='about-content'><a href='#blog'>Blog</a></div> */}
                <div className='about-content'><a href='/Contact'>Contact Us</a></div>
                <div className='about-content'><a href='/JoinUs'>Work With Us</a></div>
              </div>

              <div className='for-hawkers'>
                <div className='about'>For Hawkers</div>
                <div className='about-content'><a href='/Business'>Your Profile</a></div>
                <div className='about-content'><a href='/Business'>Edit</a></div>
                <div className='about-content'><a href='/Report'>Report Problem</a></div>
             </div>

             <div className='social-links'>
                <div className='about'>Social Links</div>
                <div className='about-content'><a href='#t'>Twitter</a></div>
                <div className='about-content'><a href='#l'>LinkedIn</a></div>
                {/* <div className='about-content'><a href='#g'>GitHub</a></div> */}
                <div className='about-content'><a href='#f'>Facebook</a></div>
             </div>
        </div>

        <div className='copyright'>
        <dic className='copyright-text'>All trademarks are properties of their respective owners. 2023 © Title™ Ltd. All rights reserved.</dic>
        </div>
    </div>
  );
}

export default Footer;
