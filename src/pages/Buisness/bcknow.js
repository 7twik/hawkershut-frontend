import "./app.css";
import React, { useRef } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useEffect, useState } from "react";
import { Room, Star, StarBorder } from "@material-ui/icons";
import axios from "axios";
import { format } from "timeago.js";
import Register from "../Register";
import Login from "../Login";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { useTranslation } from "react-i18next";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import GetStarted from "../GetStarted/GetStarted";
import AOS from "aos";
import "aos/dist/aos.css";
import ReactSwitch from "react-switch";
// Contains the value and text for the options
const languages = [
  { value: "", text: "Options" },
  { value: "en", text: "English" },
  { value: "hi", text: "Hindi" },
  { value: "ta", text: "Tamil" },
  { value: "ml", text: "Malayalam" },
  { value: "ur", text: "Urdu" },
  { value: "mr", text: "Marathi" },
  { value: "bn", text: "Bengali" },
  { value: "gu", text: "Gujarati" },
  { value: "te", text: "Telugu" },
];
function Buisness() {
  AOS.init();
  const myStoragee = window.localStorage;

  const [currentLang, setCurrentLang] = React.useState(
    myStoragee.getItem("Language")
  );
  const { t } = useTranslation();

  const [lang, setLang] = useState(myStoragee.getItem("Language"));

  // This function put query that helps to change the language
  const handleChange = (e) => {
    setLang(e.target.value);
    let loc = "https://stopby.onrender.com/business";
    window.location.replace(loc + "?lng=" + e.target.value);
    myStorage.setItem("Language", e.target.value);
  };
  function myGreeting() {
    onOpenModal();
    // setApp("toaste");
  }
  React.useEffect(() => {
    setTimeout(myGreeting, 5000);
  }, []);
  const [open, setOpen] = React.useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const myStorage = window.localStorage;
  const [currentUsername, setCurrentUsername] = useState(
    myStorage.getItem("user")
  );

  const [currentTitle, setCurrentTitle] = useState(myStorage.getItem("title"));
  const [currentDesc, setCurrentDesc] = useState(myStorage.getItem("Desc"));
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(myStorage.getItem("Title"));
  const [desc, setDesc] = useState(myStorage.getItem("Desc"));
  const [star, setStar] = useState(0);
  const [check, setCheck] = useState(false);
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
    setCheck(true);
  };
  const [per, Sper] = useState({
    lat: 47.040182,
    long: 17.071727,
  });

  useEffect(() => {
    if (checked) {
      setInterval(() => {
        console.log("d");
        handleSubmit();
        handleSubmite();
      }, 10000);
    }
  }, []);

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
  const [lat1, setLat1] = React.useState("0");
  const [long1, setLong1] = React.useState("0");
  const handleSubmit = async (e) => {
    let lat1, long1;
    // e.preventDefault();

    navigator.geolocation.getCurrentPosition(async (posi) => {
      setViewport({
        ...viewport,
        latitude: posi.coords.latitude,
        longitude: posi.coords.longitude,
      });
      console.log(posi.coords.latitude + "," + posi.coords.longitude);
      lat1 = posi.coords.latitude;
      long1 = posi.coords.longitude;
      setLat1(posi.coords.latitude);
      setLong1(posi.coords.longitude);
    });
    console.log("title: " + title + ",,desc: " + desc);
    await handleSubmite();
  };
  const handleSubmite = async (e) => {
    const newPin = {
      username: currentUsername,
      title,
      desc,
      lat: lat1,
      long: long1,
    };
    try {
      console.log(newPin);
      const res = await axios.post(
        "https://hawkerhut-back.onrender.com/api/pins",
        newPin
      );

      setCheck(false);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
    // window.location.reload();
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
  // useEffect(() => {
  //   //console.log(screenWidth);
  // }, []);

  const [checked, setChecked] = useState(true);

  const handleChange1 = (val) => {
    setChecked(val);
    if (!val) {
      const newPin = {
        username: currentUsername,
      };
      const res = axios.post(
        "https://hawkerhut-back.onrender.com/api/pins/del",
        newPin
      );
      console.log(res);
      const getPins = async () => {
        try {
          const allPins = await axios.get(
            "https://hawkerhut-back.onrender.com/api/pins"
          );
          setPins(() => {
            const new1= allPins.data;
            return new1;
          });
        } catch (err) {
          console.log(err);
        }
      };
      getPins();
      // window.location.reload();
    }
  };

  return (
    <>
      <Modal
        className="mode"
        open={open}
        onClose={onCloseModal}
        closeOnOverlayClick={false}
        center={true}
      >
        <div className="moddd">
          <div className="mod-top">Please select your local language </div>
          <select value={lang} onChange={handleChange}>
            {languages.map((item) => {
              return (
                <option key={item.value} value={item.value}>
                  {item.text}
                </option>
              );
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
            width={screenWidth > 800 ? "54vw" : "95vw"}
            height="60vh"
            transitionDuration="200"
            mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
            onViewportChange={(viewport) => setViewport(viewport)}
            // onDblClick={currentUsername && handleAddClick}
          >
            <Marker
              latitude={per.lat}
              longitude={per.long}
              offsetLeft={-3.5 * viewport.zoom}
              offsetTop={-7 * viewport.zoom}
              onClick={() => {
                handleSubmit();
              }}
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
                      <label>Information</label>
                      <span className="username">
                        Created by <b>{p.username}</b>
                      </span>
                      {/* <span className="date">{format(p.createdAt)}</span> */}
                    </div>
                  </Popup>
                )}
              </>
            ))}
            {check && (
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
              </>
            )}
          </ReactMapGL>
        </div>
        <div className="writeup">
          <div className="writeuph">
            <h2 style={{ color: "white" }}>{t("line1")}</h2>
          </div>
          <span style={{ color: "white" }}>{t("line2")}</span>
          <div className="busi_buttons">
            <div className="btn_div">
              <button
                className="btn_start"
                style={{ background: "green" }}
                onClick={() => {
                  const element = document.getElementById("gets");
                  element.scrollIntoView();
                }}
              >
                {t("b1")}
              </button>
            </div>

            {currentUsername && (
              <div className="btn_div">
                <button
                  className="btn_start"
                  style={{ background: "grey", color: "black" }}
                >
                  Business Hours
                  <ReactSwitch checked={checked} onChange={handleChange1} />
                </button>
              </div>
            )}

            {currentUsername ? (
              <div className="btn_div">
                <button className="btn_start login" onClick={handleLogout}>
                  {t("b4")}
                </button>
              </div>
            ) : (
              <>
                <div className="btn_div">
                  <button
                    className="btn_start login"
                    onClick={() => setShowLogin(true)}
                  >
                    {t("b2")}
                  </button>
                </div>
                <div className="btn_div">
                  <button
                    className="btn_start register"
                    onClick={() => setShowRegister(true)}
                  >
                    {t("b3")}
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

          <div>
            {checked && (
              <>
                <form className="busi_form" onSubmit={handleSubmit}>
                  <label>Category:</label>
                  <select
                    onChange={async (e) => {
                      setTitle(e.target.value);
                      myStorage.setItem("Title", e.target.value);
                      handleSubmit();
                    }}
                  >
                    <option value="">Options</option>
                    <option value="Ice-Cream">Ice-Cream</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Cobbler">Cobbler</option>
                    <option value="Recycle">Recycle</option>
                    <option value="Street">Street Food</option>
                    <option value="Fish">Fish</option>
                    <option value="Electrician">Electrician</option>
                    <option value="Bakery">Bakery</option>
                    <option value="All">All in One Store</option>
                  </select>
                  <label>Description</label>
                  <textarea
                    placeholder="Tell us what you are selling"
                    onChange={(e) => {
                      setDesc(e.target.value);
                      myStorage.setItem("Desc", e.target.value);
                      handleSubmit();
                    }}
                  />
                  <button type="submit" className="submitButton">
                    Add Pin
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="beforeGS" data-aos="fade-up">
        {t("beforeGS")}
      </div>
      <div id="gets">
        <GetStarted lang={lang} data-aos="fade-up" />
      </div>

      <Footer />
    </>
  );
}

export default Buisness;
