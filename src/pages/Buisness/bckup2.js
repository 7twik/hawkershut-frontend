import "./app.css";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useEffect, useState } from "react";
import { Room, Star } from "@material-ui/icons";
import axios from "axios";
import { format } from "timeago.js";
import Register from "../Register";
import Login from "../Login";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

function Buisness() {
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
        "https://sea-lion-app-6nyh2.ondigitalocean.app/api/pins",
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
          "https://sea-lion-app-6nyh2.ondigitalocean.app/api/pins"
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

  return (
    <>
      <Navbar />
      <div className="parentcon">
        <div className="mapdiv">
          <ReactMapGL
          className="mapwidth"
            {...viewport}
            mapboxApiAccessToken="pk.eyJ1IjoiYmlzd2EwMDd4IiwiYSI6ImNsZWprNGs3YzBjOGczb21pZzc5cjJqczIifQ.JS_Zgjwbm9RDW9H8KmGqKg"
            width="54vw"
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
            <h2 style={{ color: "white" }}>Your Own Business</h2>
          </div>
          <span style={{ color: "white" }}>
            Welcome to your very own online buiness portal.Set your Hawker's ID
            to get your business rolling!!!
          </span>
          <div className="busi_buttons">
            <div className="btn_div">
              <button className="btn_start" style={{ background: "green" }}>
                Get Started
              </button>
            </div>
            {currentUsername ? (
              <div className="btn_div">
                <button className="btn_start login" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <>
                <div className="btn_div">
                  <button
                    className="btn_start login"
                    onClick={() => setShowLogin(true)}
                  >
                    Login
                  </button>
                </div>
                <div className="btn_div">
                  <button
                    className="btn_start register"
                    onClick={() => setShowRegister(true)}
                  >
                    Register
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
      <Footer />
    </>
  );
}

export default Buisness;
