import React from "react";
import "../categories/categories.css";
import AOS from "aos";
import "aos/dist/aos.css";
const Categories = () => {
  const myStoragee = window.localStorage;
  //const [lang, setLang] = React.useState(myStoragee.getItem("Category"));
  AOS.init();
  function handleClick(e) {
    myStoragee.setItem("Category", e.target.getAttribute("value"));
    console.log(e.target.getAttribute("value"));
    window.location.href = "http://localhost:5173/category";
  }
  return (
    <div>
      <div className="container-fluid text-center">
        <div className="row">
          <div className="Faqq" data-aos="fade-up" >
            Categories
          </div>
          <h4 style={{width:"75vw",color:"#615d5d"}}>Check our wide range of categories and see which hawker is nearby your location to place your order quickly.</h4>
          <div
            className="col-lg-4 col1"
            onClick={handleClick}
            data-aos="fade-up-right"
            value="Ice-Cream-Seller"
          >
            Ice-Cream
          </div>
          <div
            className="col-lg-4 col2"
            onClick={handleClick}
            data-aos="fade-up"
            value="Vegetables/Fruits-Seller"
          >
            Vegetables and Fruits
          </div>
          <div
            className="col-lg-4 col3"
            onClick={handleClick}
            data-aos="fade-up-left"
            value="All-in-one-store"
          >
            All in one Store
          </div>
          <div
            className="col-lg-4 col4"
            onClick={handleClick}
            data-aos="fade-up-right"
            value="Street-Food-Vendor"
          >
            Street Food
          </div>
          <div
            className="col-lg-4 col5"
            onClick={handleClick}
            data-aos="fade-up"
            value="Bakery"
          >
            Bakery
          </div>
          <div
            className="col-lg-4 col6"
            onClick={handleClick}
            data-aos="fade-up-left"
            value="Recycle"
          >
            Recycle
          </div>
          <div
            className="col-lg-4 col7"
            onClick={handleClick}
            data-aos="fade-up-right"
            value="Fish-Seller"
          >
            Fish
          </div>
          <div
            className="col-lg-4 col8"
            onClick={handleClick}
            data-aos="fade-up"
            value="Cobbler"
          >
            Cobbler
          </div>
          <div
            className="col-lg-4 col9"
            onClick={handleClick}
            data-aos="fade-up-left"
            value="Electrician"
          >
            Electrician
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
