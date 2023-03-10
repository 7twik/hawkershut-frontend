import React from 'react'
import '../categories/categories.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
const Categories = () => {
  AOS.init();
  return (
    <div>
        <div className="container-fluid text-center">
  <div className="row">
  <div className="Faqq" data-aos="fade-up">
          Categories
        </div>
    <div className="col-lg-4 col1" data-aos="fade-up-right">
      Ice-Cream
    </div>
    <div className="col-lg-4 col2" data-aos="fade-up">
      Vegetables
    </div>
    <div className="col-lg-4 col3" data-aos="fade-up-left">
      Pani Puri
    </div>
    <div className="col-lg-4 col4" data-aos="fade-up-right">
      Street Food
    </div>
    <div className="col-lg-4 col5" data-aos="fade-up">
      Bakery
    </div>
    <div className="col-lg-4 col6" data-aos="fade-up-left">
      Cold Drinks
    </div>
    <div className="col-lg-4 col7" data-aos="fade-up-right">
      Fish
    </div>
    <div className="col-lg-4 col8" data-aos="fade-up">
      Cobbler
    </div>
    <div className="col-lg-4 col9" data-aos="fade-up-left">
      Electrician
    </div>
  </div>
    
    
  </div>
</div>
    
  )
}

export default Categories