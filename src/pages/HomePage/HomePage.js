import React, { useEffect } from 'react'
import "./home.css";
 import Footer from '../Footer/Footer'
// import Navbar from '../Navbar/Navbar'
import Categories from "../categories/categories"
import "react-responsive-modal/styles.css";
import Carousel from "react-bootstrap/Carousel";
import Map from "../Map/Map"
import Login from '../../components/Login';
import Navbare from '../../components/Navbare/Navbare';
import About from '../../components/About/About';
import { changeLanguage } from 'i18next';
import useEth from "../../contexts/EthContext/useEth"; 
import Download from "../Download/Download";
import WrongNetwork from "../WrongNetwork/WrongNetwork";
import CCurrentorders from '../CCurrentorders/CCurrentorders';
import CPastorders from '../CPastorders/CPastorders';
const HomePage = () => {
  const [success,setS]=React.useState(false);
  const [note,setNotes]=React.useState();
  const myStorage = window.localStorage;
  const [currentUsername, setCurrentUsername] = React.useState(myStorage.getItem("Customeruser"));
  function logged_in(data)
  {
   
    console.log(data);
    setS(data);
  }
  useEffect(()=>{
    if(currentUsername){
      setS(true);
    } 
    else{
      setS(false);
    }   
  },[currentUsername])
  const handleLogout = () => {
    setCurrentUsername(null);
    myStorage.removeItem("Customeruser");
    window.location.reload();
  };
  const [tab,setTab]=React.useState(0);
  function changeTab(data){
    setTab(data);
  }
  const {ethereum}=window;
  const { state } = useEth();
  const [download, setDownload] = React.useState(false);
  React.useEffect(() => {
    if(ethereum)
    {
      setDownload(true);
    }
  });
  return (
    <>{(download)?<>
    <>{(success)?
    <><div className='Appo' style={{overflowX:"hidden"}}>
    {(!state.contract)? <WrongNetwork />:<></>}
    <Navbare user={currentUsername} logout={handleLogout} changeTab={changeTab} />
    {(tab===0)?
    <>
        <header className="App-header">
        <div className="body">
          <section className="contain">
            <div className="top-card banner-msg-box form_container msg">
              <div className="top-Header">Your own cart, at your location!</div>
              <div className="top-middle">
                Craving for some street food or looking for nearby local vendors? We got you covered!
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
      <Categories /></>
    :(tab===1)?<> <CCurrentorders user={currentUsername} /> </>:<><CPastorders user={currentUsername} /></>}
      <About />
      <div className="Footer">
        <Footer />
      </div>
    </div></>:<Login
    setShowLogin={logged_in}
    setCurrentUsername={setCurrentUsername}
    myStorage={myStorage}
    />}</>
    </>:<><Download /></>}</>
  )
}

export default HomePage