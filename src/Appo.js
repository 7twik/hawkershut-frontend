import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage"
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Error from "./components/Error";
// import WorkPlaces from './Pages/WorkPlaces/WorkPlaces';
// import Blog from './Pages/Blog/Blog';
// import AddBlog from './Pages/AddBlog/AddBlog';
// import Member from './Pages/Member/Member';
// import Call from './Pages/Call/Call';
// import Privacy from './Pages/privacyPolicy/Privacy';
// import About from './Pages/About/About';
// import Testimonial from './Pages/Testimonial/Testimonial';
function Appo() {
  return (
    <div className="App">
      <header className="App-header">
      {/* <Call /> */}
        <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dash" element={<Dashboard />} />
              <Route path="*" element={<Error />} />
        </Routes>
      </header>
    </div>
  );
}

export default Appo;