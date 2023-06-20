import "./app.css";
import React, { useRef } from "react"
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useEffect, useState } from "react";
import { Room, Star, StarBorder } from "@material-ui/icons";
import axios from "axios";
import { format } from "timeago.js";
import Register from "../Register";
import Login from "../Login";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { useTranslation } from 'react-i18next'
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import GetStarted from "../GetStarted/GetStarted";
import AOS from 'aos';
import 'aos/dist/aos.css';

// Contains the value and text for the options
const languages = [
  { value: '', text: "Options" },
  { value: 'en', text: "English" },
  { value: 'hi', text: "Hindi" },
  { value: 'ta', text: "Tamil" },
  { value: 'ml', text: "Malayalam" },
  { value: 'ur', text: "Urdu" },
  { value: 'mr', text: "Marathi" },
  { value: 'bn', text: "Bengali" },
  { value: 'gu', text: "Gujarati" },
  { value: 'te', text: "Telugu" }
]
function Buisness() {

  AOS.init();
  const myStoragee = window.localStorage;

  const [currentLang, setCurrentLang] = React.useState(myStoragee.getItem("Language"));
  const { t } = useTranslation(); 
  
  const [lang, setLang] = useState(myStoragee.getItem("Language"));

  // This function put query that helps to 
  // change the language
  const handleChange = e => { 
      setLang(e.target.value);
      let loc = "https://stopby.onrender.com/business";
      window.location.replace(loc + "?lng=" + e.target.value);
      myStorage.setItem('Language', e.target.value);
  }
  function myGreeting()
  {
    onOpenModal();
   // setApp("toaste");
  }
  React.useEffect(()=>{
    setTimeout(myGreeting, 5000);
  },[]);
  const [open, setOpen] = React.useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const myStorage = window.localStorage;
  const [currentUsername, setCurrentUsername] = useState(
    myStorage.getItem("user")
  );
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [star, setStar] = useState(0);
  const [viewport, setViewport] = useState({
    latitude: 47.040182,
    longitude: 17.071727,
    zoom: 9,
  });
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  const handleAddClick = (e) => {
    const [longitude, latitude] = e.lngLat;
    setNewPlace({
      lat: latitude,
      long: longitude,
    });
  };
  const [per, Sper] = useState({
    lat: 47.040182,
    long: 17.071727,
  });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setViewport({
        ...viewport,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
      Sper({
        lat: pos.coords.latitude,
        long: pos.coords.longitude,
      });
    });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUsername,
      title,
      desc,
      rating: star,
      lat: newPlace.lat,
      long: newPlace.long,
    };

    try {
      const res = await axios.post(
        "https://hawkerhut-back.onrender.com/api/pins",
        newPin
      );
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getPins = async () => {
      try {
        const allPins = await axios.get(
          "https://hawkerhut-back.onrender.com/api/pins"
        );
        setPins(allPins.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  const handleLogout = () => {
    setCurrentUsername(null);
    myStorage.removeItem("user");
  };
  let screenWidth = window.screen.width;
  useEffect(()=>{
    console.log(screenWidth)
  },[])
  return (
    <>
    <Modal className="mode" open={open} onClose={onCloseModal} closeOnOverlayClick={false} center={true}>
    <div className='moddd'>
  <div className="mod-top">Contact us to get yourself a workplace today </div>       
  <select value={lang} onChange={handleChange}>
                {languages.map(item => {
                    return (<option key={item.value} 
                    value={item.value}>{item.text}</option>);
                })}
            </select>
              </div>
      </Modal>
      <Navbar />
      <div className="parentcon">
        <div className="mapdiv">
          <ReactMapGL
          className="mapwidth"
            {...viewport}
            mapboxApiAccessToken="pk.eyJ1IjoiYmlzd2EwMDd4IiwiYSI6ImNsZWprNGs3YzBjOGczb21pZzc5cjJqczIifQ.JS_Zgjwbm9RDW9H8KmGqKg"
            width={(screenWidth>800) ? "54vw" : "90vw"}
            height="60vh"
            transitionDuration="200"
            mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
            onViewportChange={(viewport) => setViewport(viewport)}
            onDblClick={currentUsername && handleAddClick}
          >
            <Marker
              latitude={per.lat}
              longitude={per.long}
              offsetLeft={-3.5 * viewport.zoom}
              offsetTop={-7 * viewport.zoom}
            >
              <Room
                style={{
                  fontSize: 5 * viewport.zoom,
                  color: "blue",
                  cursor: "pointer",
                }}
              />
            </Marker>
            {pins.map((p) => (
              <>
                <Marker
                  latitude={p.lat}
                  longitude={p.long}
                  offsetLeft={-3.5 * viewport.zoom}
                  offsetTop={-7 * viewport.zoom}
                >
                  <Room
                    style={{
                      fontSize: 5 * viewport.zoom,
                      color:
                        currentUsername === p.username ? "tomato" : "slateblue",
                      cursor: "pointer",
                    }}
                    onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
                  />
                </Marker>
                {p._id === currentPlaceId && (
                  <Popup
                    key={p._id}
                    latitude={p.lat}
                    longitude={p.long}
                    closeButton={true}
                    closeOnClick={false}
                    onClose={() => setCurrentPlaceId(null)}
                    anchor="left"
                  >
                    <div className="card">
                      <label>Place</label>
                      <h4 className="place">{p.title}</h4>
                      <label>Review</label>
                      <p className="desc">{p.desc}</p>
                      <label>Rating</label>
                      <div className="stars">
                        {Array(p.rating).fill(<Star className="star" />)}
                      </div>
                      <label>Information</label>
                      <span className="username">
                        Created by <b>{p.username}</b>
                      </span>
                      <span className="date">{format(p.createdAt)}</span>
                    </div>
                  </Popup>
                )}
              </>
            ))}
            {newPlace && (
              <>
                <Marker
                  latitude={newPlace.lat}
                  longitude={newPlace.long}
                  offsetLeft={-3.5 * viewport.zoom}
                  offsetTop={-7 * viewport.zoom}
                >
                  <Room
                    style={{
                      fontSize: 7 * viewport.zoom,
                      color: "tomato",
                      cursor: "pointer",
                    }}
                  />
                </Marker>
                <Popup
                  latitude={newPlace.lat}
                  longitude={newPlace.long}
                  closeButton={true}
                  closeOnClick={false}
                  onClose={() => setNewPlace(null)}
                  anchor="left"
                >
                  <div>
                    <form onSubmit={handleSubmit}>
                      <label>Title</label>
                      <input
                        placeholder="Enter a title"
                        autoFocus
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <label>Description</label>
                      <textarea
                        placeholder="Say us something about this place."
                        onChange={(e) => setDesc(e.target.value)}
                      />
                      <label>Rating</label>
                      <select onChange={(e) => setStar(e.target.value)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                      <button type="submit" className="submitButton">
                        Add Pin
                      </button>
                    </form>
                  </div>
                </Popup>
              </>
            )}
          </ReactMapGL>
        </div>
        <div className="writeup">
          <div className="writeuph">
            <h2 style={{ color: "white" }}>{t('line1')}</h2>
          </div>
          <span style={{ color: "white" }}>
          {t('line2')}
          </span>
          <div className="busi_buttons">
            <div className="btn_div">
            <button className="btn_start" style={{ background: "green" }} onClick={()=>{
             const element = document.getElementById("gets");
              element.scrollIntoView();
            }}>
              {t('b1')}
              </button>          
            </div>
            {currentUsername ? (
              <div className="btn_div">
                <button className="btn_start login" onClick={handleLogout}>
                {t('b4')}
                </button>
              </div>
            ) : (
              <>
                <div className="btn_div">
                  <button
                    className="btn_start login"
                    onClick={() => setShowLogin(true)}
                  >
                    {t('b2')}
                  </button>
                </div>
                <div className="btn_div">
                  <button
                    className="btn_start register"
                    onClick={() => setShowRegister(true)}
                  >
                    {t('b3')}
                  </button>
                </div>
              </>
            )}
          </div>
          {showRegister && <Register setShowRegister={setShowRegister} />}
          {showLogin && (
            <Login
              setShowLogin={setShowLogin}
              setCurrentUsername={setCurrentUsername}
              myStorage={myStorage}
            />
          )}
        </div>
      </div>
      <div className="beforeGS" data-aos="fade-up">
      {t('beforeGS')}
      </div>
      <div id="gets">
      <GetStarted  lang={lang} data-aos="fade-up" />
      </div>
      
      <Footer />
    </>
  );
}

export default Buisness;
