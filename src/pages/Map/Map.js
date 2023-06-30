import "./app.css";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { React,useEffect, useState,useRef } from "react";
import { Room, Star } from "@material-ui/icons";
import axios from "axios";
import { format } from "timeago.js";
import AOS from "aos";
import "aos/dist/aos.css";
import { AiOutlineSearch } from "react-icons/ai";
import Button from "react-bootstrap/esm/Button";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import useEth from "../../contexts/EthContext/useEth"; 
import web3 from "web3";
import WrongNetwork from "../WrongNetwork/WrongNetwork";
import Download from "../Download/Download";
import { use } from "i18next";
function Map(props) {
 
  AOS.init();
  const myStorage = window.localStorage;
  const [currentUsername, setCurrentUsername] = useState(
    myStorage.getItem("user")
  );
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);


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
  // var screen=Screen;
  let screenWidth = window.screen.width;
  useEffect(() => {
    // console.log(screenWidth);
  }, []);

  //searchbar functionality
  const [productList, setProductList] = useState([]);

  const [checked, setChecked] = useState(localStorage.getItem("Checked"));
  useEffect(() => {
    const getPins = async () => {
      try {
        const allPins = await axios.get(
          "https://hawkerhut-back.onrender.com/api/pins"
        );
        console.log(allPins.data);

        for (let i = 0; i < allPins.data.length; i++) {
          // productList.push(allPins.data[i].title);
          setProductList((prev) => {
            return [...prev, allPins.data[i].title];
          });
          setProducts((prev) => {
            return [...prev, allPins.data[i].title];
          });
        }
        console.log(productList);

        setPins(() => {
          const newl = allPins.data;
          return newl;
        });
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, [checked]);
  

  const [products, setProducts] = useState(productList);
  console.log(productList)
  const [searchVal, setSearchVal] = useState("");
  function handleSearch() {
    if (searchVal === "") {
      setProducts(productList);
      return;
    }
    const filterBySearch = productList.filter((item) => {
      console.log(item);
      if (item.toLowerCase().includes(searchVal.toLowerCase())) {
        return item;
      }
    });
    console.log(filterBySearch);
    setProducts(filterBySearch);
    
  }
  const [tempUser,setTempUser]=useState();
  const openModal = (e,usernamee) => {
    console.log("opened");
    setTempUser(usernamee);
    onOpenModal();
  }



  ///WEB3//////////////////////////////////////////

  const [customer, setCustomer] = useState(currentUsername);
  const orderRef = useRef();
  const phoneRef = useRef();
  const amountRef = useRef();
  const mesRef = useRef();
  const { ethereum } = window;
   /////////////////hash for payment////////////////////
  const { state: { contract, accounts } } = useEth();

  // useEffect(() => {
  //   if (customer === null || customer === "") {
  //     window.location.replace("http://localhost:5173/");
  //   }
  // }, [customer]);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      Sper({
        lat: pos.coords.latitude,
        long: pos.coords.longitude,
      });
    });
  }, []);
  function hashGenerator(){
    const length=16;
    let result="";
    const characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength=characters.length;
    for(let i=0;i<length;i++)
    { 
      result+=characters.charAt(Math.floor(Math.random()*charactersLength));
    }
    return result;
  }
  const handleOrderSubmit = async () => {
    ////////////////web3 connect and ask payment//////////////////////
    const accountss = await ethereum.request({
      method: 'eth_requestAccounts',
    });
    const Hash=hashGenerator();
    console.log(Hash);
    let vale=amountRef.current.value.toString();
    const res=await contract.methods.pay(Hash).send({value:web3.utils.toWei(vale, "ether"), from: accountss[0] });
    console.log(res);
    const va=res.events.success.returnValues[2].toString();
    alert(res.events.success.returnValues[0]+"\n Payment: "+web3.utils.fromWei(va, "ether")+" Eth");
    if(res.events.success.returnValues[1])
    {
      /////////////////if error or denied then cancel order///////////////
      const data={
        Hash:Hash,
        CUser: props.user,
        HUser: tempUser,
        CPhone: phoneRef.current.value,
        Lat: per.lat,
        Long: per.long,
        Message: mesRef.current.value
      }
      
      if (phoneRef.current.value.length !== 10) {
        alert("Enter a valid phone no");
      } else {
        await axios.post("https://hawkerhut-back.onrender.com/api/web3/order", data);
        console.log(
          "O: " +
            orderRef.current.value +
            " P:" +
            phoneRef.current.value +
            " L:" +
            per.lat +
            " L:" +
            per.long
        );
      }
    }
  };
  const { state } = useEth();
  const [download, setDownload] = useState(false);
  useEffect(() => {
    if(ethereum)
    {
      setDownload(true);
    }
  });

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
        {(download)?<>
        {(!state.contract)? <WrongNetwork />:<></>}
          <div className="mod-top">Please Place Your Request </div>
          <span>Order for : {tempUser}</span>
          <br />
          Place Orders:
          <input type="text" placeholder="Enter your requirements or message for the hawker" ref={mesRef} /><br/>
          <input
            type="number"
            placeholder="Enter your phone no"
            ref={phoneRef}
          />
          <br />
          <input type="text" placeholder="Enter amount(min. 0.1)" ref={amountRef} />
          <br />
          <button onClick={handleOrderSubmit}>Submit</button></>:<><Download /></>}
        </div>
      </Modal>

      <div
        className="parentcon"
        data-aos="fade-up"
        style={{
          overflowX: "hidden",
          display: "flex",
          justifyContent: "space-arond",
        }}
      >
        <div
          style={{
            height: "100vh",
            width: "100%",
            display: "flex",
            alignItems: "center",
            marginLeft: "5vw",
          }}
        >
          <ReactMapGL
            className="mapwidth"
            {...viewport}
            mapboxApiAccessToken="pk.eyJ1IjoiYmlzd2EwMDd4IiwiYSI6ImNsZWprNGs3YzBjOGczb21pZzc5cjJqczIifQ.JS_Zgjwbm9RDW9H8KmGqKg"
            width={screenWidth > 800 ? "54vw" : "90vw"}
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
                className="map_mark"
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
                    tipSize={20}
                    latitude={p.lat}
                    longitude={p.long}
                    closeButton={true}
                    closeOnClick={false}
                    onClose={() => setCurrentPlaceId(null)}
                    anchor="left"
                    className="map-popup"
                  >
                    <div className="card">  
                    {/* card for inner card css change and mapboxgl-popup-content css change */}
                      <label>Place</label>
                      <h4 className="place">{p.title}</h4>
                      <label>Review</label>
                      <p className="desc">{p.desc}</p>
                      {/* <label>Rating</label>
                      <div className="stars">
                        {Array(p.rating).fill(<Star className="star" />)}
                      </div> */}
                      <label>Information</label>
                      <span className="username">
                        Created by <b>{p.username}</b>
                      </span>
                      <span className="date">{format(p.createdAt)}</span>
                      <Button onClick={()=>{
                        setTempUser(p.username);
                        onOpenModal();
                      }}>Request Visit</Button>
                    </div>
                  </Popup>
                )}
              </>
            ))}
          </ReactMapGL>
        </div>
        <div
          className="writeup"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginRight: "10vh",
          }}
        >
          {/* Search bar for customer */}
          <div className="searchbar">
            <input
              type="text"
              placeholder="Search for your favourite food"
              onChange={(e) => setSearchVal(e.target.value)}
            />
            <button className="searchbtn" onClick={handleSearch}>
              <AiOutlineSearch />
            </button>
          </div>
          <div>
            {products.map((product) => {
              return (
                <div style={{ color: "white", background: "green" }}>
                  {product}
                </div>
              );
            })}
          </div>
          <div className="writeuph">
            <h2 style={{ color: "white" }}>Your Own Business</h2>
          </div>
          <span style={{ color: "white" }}>
            Welcome to your very own online buiness portal.Check out for what
            you want and start shopping!!!
          </span>

          <div className="btn_div">
            <button className="btn_start" style={{ backgroundColor: "green" }}>
              Get Started
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Map;
