//import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Error from "./components/Error";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Routes, Route, useNavigate } from "react-router-dom"
import { useEffect, useContext, useState } from "react";
import { LoginContext } from "./components/ContextProvider/Context";
import HomePage from "./pages/HomePage/HomePage";

import Buisness from "./pages/Buisness/Buisness";
import BReg from "./pages/BReg/BReg";
import BLog from "./pages/BLog/BLog";

import "./i18n.js"
import Cate from "./pages/CategoryMajor/Cate";
function App() {

  const [data, setData] = useState(false);

  const { logindata, setLoginData } = useContext(LoginContext);


  const history = useNavigate();

  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");

    const res = await fetch("https://hawkerhut-back.onrender.com/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    });

    const data = await res.json();

    if (data.status == 401 || !data) {
      console.log("user not valid");
    } else {
      console.log("user verify");
      setLoginData(data)
      history("/dash");
    }
  }

  useEffect(() => {
    setTimeout(()=>{
      DashboardValid();
      setData(true)
    },2000)

  }, [])

  return (
    <>
      {
        data ? (
          <>
            {/* <Navbar /> */}
 {/* en,,hi,ta,ml,ur,mr,bn,gu,te */}
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* <Route path="/dash" element={<Dashboard />} /> */}
              <Route path="*" element={<Error />} />
              <Route path="/" element={<HomePage />}/>
              <Route path="/business" element={<Buisness />}/>
              <Route path="/business?lng=en" element={<Buisness />}/>
              <Route path="/business?lng=hi" element={<Buisness />}/>
              <Route path="/business?lng=ta" element={<Buisness />}/>
              <Route path="/business?lng=ml" element={<Buisness />}/>
              <Route path="/business?lng=ur" element={<Buisness />}/>
              <Route path="/business?lng=mr" element={<Buisness />}/>
              <Route path="/business?lng=bn" element={<Buisness />}/>
              <Route path="/business?lng=gu" element={<Buisness />}/>
              <Route path="/business?lng=te" element={<Buisness />}/>
              <Route path="/bregister" element={<BReg />}/>
              <Route path="/blogin" element={<BLog/>}/>
              <Route path="/category" element={<Cate />} />
            </Routes>
            
          </>

        ) : <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }} className="loading" style={{color:"aliceblue"}}>
          Loading... &nbsp;
          <CircularProgress />
        </Box>
      }


    </>
  );
}

export default App;