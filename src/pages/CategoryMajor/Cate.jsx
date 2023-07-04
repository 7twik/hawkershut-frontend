import React from "react";
import Navbare from "../../components/Navbare/Navbare";
import Carousel from "react-bootstrap/Carousel";
import About from "../../components/About/About";
import Footer from "../Footer/Footer";
import { Category } from "@material-ui/icons";
import CatMap from "../CategoryMap/CatMap";
const Cate = () => {
  const [s1, sets1] = React.useState(
    "https://res.cloudinary.com/dqy7m95yz/image/upload/v1677339876/bakerry_yzunbc.png"
  );
  const [s2, sets2] = React.useState(
    "https://res.cloudinary.com/dqy7m95yz/image/upload/v1677352787/veg_jq7mfv.png"
  );
  const [s3, sets3] = React.useState(
    "https://res.cloudinary.com/dqy7m95yz/image/upload/v1677342472/icee_cream_wxgmak.png"
  );
  const [success, setS] = React.useState(false);
  //const [note,setNotes]=React.useState();
  const myStorage = window.localStorage;
  const [currentCat, setCurrentCat] = React.useState(
    myStorage.getItem("Category")
  );

  const [currentUsername, setCurrentUsername] = React.useState(
    myStorage.getItem("Customeruser")
  );
  //   function logged_in(data)
  //   {

  //     console.log(data);
  //     setS(data);
  //   }
  React.useEffect(() => {
    if (currentUsername) {
      setS(true);
    } else {
      window.location.replace("http://localhost:5173/");
      setS(false);
    }
  }, [currentUsername]);
  React.useEffect(() => {
    if (currentCat === "Ice-Cream") {
    }
    if (currentCat === "All") {
    }
    if (currentCat === "Bakery") {
    }
    if (currentCat === "Cobbler") {
    }
    if (currentCat === "Recycle") {
    }
    if (currentCat === "Street") {
    }
    if (currentCat === "Electrician") {
    }
    if (currentCat === "Fish") {
    }
    if (currentCat === "Vegetables") {
    }
  }, []);
  const handleLogout = () => {
    setCurrentUsername(null);
    myStorage.removeItem("Customeruser");
    window.location.reload();
  };
  return (
    <div>
      <Navbare user={currentUsername} logout={handleLogout} />
      <header className="App-header">
        <div className="body">
          <section className="contain">
            <div className="top-card banner-msg-box form_container msg">
              <div className="top-Header">Your own cart, at your location!</div>
              <div className="top-middle">
                Craving for some street food or looking for nearby local
                vendors? We got you covered!
              </div>
            </div>
            <div className="slide">
              <Carousel
                className="slide"
                controls={true}
                keyboard={true}
                touch={true}
                interval={3000}
              >
                <Carousel.Item>
                  <img
                    className="d-block w-900 home-im"
                    src={s1}
                    alt="First slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-900 home-im"
                    src={s2}
                    alt="Second slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-900 home-im"
                    src={s3}
                    alt="Third slide"
                  />
                </Carousel.Item>
              </Carousel>
            </div>
          </section>
        </div>
      </header>
      <CatMap category={currentCat} />
      <Category />
      <About />
      <div className="Footer">
        <Footer />
      </div>
    </div>
  );
};

export default Cate;
