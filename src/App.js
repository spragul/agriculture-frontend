import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login/login";
import SignIn from "./Pages/Signup/signup";
import { Forgot } from "./Pages/ForgotPassword/ForgotPassword";
import Reset from "./Pages/ResetPassword/ResetPassword";
import Home from "./home";
import AddShopOwner from "./Components/Admin/shop/AddShopOwner/AddShopOwner";
import UpdateUser from "./Pages/Role/roleUser";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignIn/>} />
        <Route path="/forgotpassword" element={<Forgot/>} />
        <Route path="/resetpassword/:id/:token" element={<Reset/>} />
        <Route path="/updateuser" element={<UpdateUser/>}/>
        <Route path="/adduser" element={<AddShopOwner/>}/>
      </Routes>
    </div>
  );
}

export default App;
