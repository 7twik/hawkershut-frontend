import React, { useEffect } from "react";
import "./home.css";
import Footer from "../Footer/Footer";
// import Navbar from '../Navbar/Navbar'
import Categories from "../categories/categories";
import "react-responsive-modal/styles.css";
import Carousel from "react-bootstrap/Carousel";
import Map from "../Map/Map";
import Login from "../../components/Login";
import Navbare from "../../components/Navbare/Navbare";
import CCurrentorders from "../CCurrentorders/CCurrentorders";
import CPastorders from "../CPastorders/CPastorders";
import FAQ from "../../components/faq/FAQ";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { RxCross2 } from "react-icons/rx";
import Video from "../Video/Video";

const HomePage = () => {
  const [open, setOpen] = React.useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  function myGreeting() {
    onOpenModal();
    // setApp("toaste");
  }
  React.useEffect(() => {
    setTimeout(myGreeting, 1000);
  }, []);

  const [success, setS] = React.useState(false);
  // const [note,setNotes]=React.useState();
  const myStorage = window.localStorage;
  const [currentUsername, setCurrentUsername] = React.useState(
    myStorage.getItem("Customeruser")
  );
  function logged_in(data) {
    console.log(data);
    setS(data);
  }
  useEffect(() => {
    if (currentUsername) {
      setS(true);
    } else {
      setS(false);
    }
  }, [currentUsername]);
  const handleLogout = () => {
    setCurrentUsername(null);
    myStorage.removeItem("Customeruser");
    window.location.reload();
  };
  const [tab, setTab] = React.useState(0);
  function changeTab(data) {
    setTab(data);
  }
  return (
    <>
      <>
        {success ? (
          <>
            <div className="Appo" style={{ overflowX: "hidden" }}>
              <Navbare
                user={currentUsername}
                logout={handleLogout}
                changeTab={changeTab}
              />
              {tab === 0 ? (
                <>
                  <header className="App-header">
                    <div className="body">
                      <section className="contain">
                        <div className="top-card banner-msg-box form_container msg">
                          <div className="top-Header">
                            Your own cart, at your location!
                          </div>
                          <div className="top-middle">
                            Craving for some street food or looking for nearby
                            local vendors? We got you covered!
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
                                src="https://res.cloudinary.com/dqy7m95yz/image/upload/v1677339876/bakerry_yzunbc.png"
                                alt="First slide"
                              />
                            </Carousel.Item>
                            <Carousel.Item>
                              <img
                                className="d-block w-900 home-im"
                                src="https://res.cloudinary.com/dqy7m95yz/image/upload/v1677352787/veg_jq7mfv.png"
                                alt="Second slide"
                              />
                            </Carousel.Item>
                            <Carousel.Item>
                              <img
                                className="d-block w-900 home-im"
                                src="https://res.cloudinary.com/dqy7m95yz/image/upload/v1677342472/icee_cream_wxgmak.png"
                                alt="Third slide"
                              />
                            </Carousel.Item>
                          </Carousel>
                        </div>
                      </section>
                    </div>
                  </header>
                  <Map user={currentUsername} />
                  <Categories />
                </>
              ) : tab === 1 ? (
                <>
                  {" "}
                  <CCurrentorders user={currentUsername} />{" "}
                </>
              ) : (
                <>
                  <CPastorders user={currentUsername} />
                </>
              )}
              {/* <About /> */}
              <div>
              <h2>How to Use Our Platform</h2>
              <Video url="https://youtu.be/fd1Q9T8ZzzE" text="Want to know on how to use our platform?" />
              </div>
              
              <FAQ />
              <div className="Footer">
                <Footer />
              </div>
            </div>
          </>
        ) : (
          <>
            <Modal
              className="mode"
              open={open}
              onClose={onCloseModal}
              closeOnOverlayClick={false}
              center={true}
              closeIcon={<RxCross2 style={{color:"white",fontSize:"25px"}} />}
            >
              <div className="moddd">
                <div className="mod-top">
                  Please select your local language{" "}
                </div>
              </div>
            </Modal>
            <Login
              setShowLogin={logged_in}
              setCurrentUsername={setCurrentUsername}
              myStorage={myStorage}
            />
          </>
        )}
      </>
    </>
  );
};

export default HomePage;
