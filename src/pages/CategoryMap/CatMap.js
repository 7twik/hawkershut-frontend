import "./app.css";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useEffect, useState } from "react";
import { Room } from "@material-ui/icons";
import axios from "axios";
import { format } from "timeago.js";
// import Register from "../Register";
// import Login from "../Login";
import AOS from 'aos';
import 'aos/dist/aos.css';
//import { width } from "@mui/system";

function CatMap(props) {
    AOS.init();
  const myStorage = window.localStorage;
  const [currentUsername, setCurrentUsername] = useState(myStorage.getItem("user"));
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [star, setStar] = useState(0);
  const [viewport, setViewport] = useState({
    latitude: 47.040182,
    longitude: 17.071727,
    zoom: 10,
  });
//   const [showRegister, setShowRegister] = useState(false);
//   const [showLogin, setShowLogin] = useState(false);

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
  const [per,Sper]=useState({
    lat: 47.040182,
    long: 17.071727,})
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(pos => {
      setViewport({
        ...viewport,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
      });
      Sper({
        lat: pos.coords.latitude,
        long: pos.coords.longitude
      })
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
      const res = await axios.post("https://hawkerhut-back.onrender.com/api/pins", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getPins = async () => {
      try {
        console.log("checkkk"+props.category);
        const options ={
            method: 'GET',
            url: 'https://hawkerhut-back.onrender.com/api/pins/category',
            params: {Category: props.category},
         };
         axios.request(options).then((response) => {
            console.log(response.data)
            
           setPins(response.data)

        }).catch((error) => {
            console.error(error)
        })
         
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
  // var screen=Screen;
  let screenWidth = window.screen.width;
  useEffect(()=>{
    console.log(screenWidth)
  },[])
  return (
    <>
    <div className="parentcon" data-aos="fade-up" style={{overflowX:"hidden",display:"flex",justifyContent:"space-arond"}}>
      <div style={{ height: "100vh", width: "100%",display:"flex",alignItems:"center",marginLeft:"5vw"  }}>
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
            <Room className="map_mark"
              style={{
                fontSize: 5 * viewport.zoom,
                color:
                  "blue",
                cursor: "pointer",
              }}
            />
          </Marker>
      {(pins==null)?<></>:pins.map((p) => (
        <>
          <Marker
            latitude={p.lat}
            longitude={p.long}
            offsetLeft={-3.5 * viewport.zoom}
            offsetTop={-7 * viewport.zoom}
          >
            <Room
             className="map_mark"
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
              className="map-popup"
            >
              <div className="card">
                <label >Category:</label>
                <h4 className="place">{p.title}</h4>
                <label >Items:</label>
                <p className="desc">{p.desc}</p>
                {/* <label >Rating</label>
                <div className="stars">
                  {Array(p.rating).fill(<Star className="star" />)}
                </div> */}
                <label >Information</label>
                <span className="username">
                  Created by <b>{p.username}</b>
                </span>
                {/* <span className="date">{format(p.createdAt)}</span> */}
              </div>
            </Popup>
          )}
        </>
      ))}
      
    </ReactMapGL>
  </div>
  <div className="writeup" style={{display:"flex",flexDirection:"column",justifyContent:"center",marginRight:"10vh"}}>
  <div className="writeuph"><h2 style={{color:"white"}}>Your Own Business</h2></div> 
    <span style={{color:"white"}}>Welcome to your very own online buiness portal.Set your Hawker's ID to get your business rolling!!!</span>
    
    <div className="btn_div"><button className="btn_start" style={{backgroundColor:"green"}}>Get Started</button></div>
  </div>
  
  
  </div>
    </>
  );
}

export default CatMap;