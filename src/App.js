import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login/login";
import SignIn from "./Pages/Signup/signup";
import { Forgot } from "./Pages/ForgotPassword/ForgotPassword";
import Reset from "./Pages/ResetPassword/ResetPassword";
import Home from "./home";
import AddShopOwner from "./Components/Admin/shop/AddShopOwner/AddShopOwner";
import UpdateUser from "./Pages/Role/roleUser";
import Addvegetable from "./Components/Market/addmarket/addmarketvegetable";
import Vegetablelist from "./Components/Market/vegetablelist/vegetablelist";
import EditVegetable from "./Components/Market/edit-Vegetable/editVegetable";
import Priceupdate from "./Components/Market/price-Update/Priceupdate";
import Addshop from "./Components/shops/addshop/Addshop";
import EditShop from "./Components/shops/EditShop/EditShop";
import ShopList from "./Components/shops/ListShops/shoplist";
import ShopDetails from "./Components/shops/Shop Details/ShopDetails";
import Addfertilizer from "./Components/shops/fettilizer/Addfertilizer";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignIn />} />
        <Route path="/forgotpassword" element={<Forgot />} />
        <Route path="/resetpassword/:id/:token" element={<Reset />} />
        <Route path="/updateuser" element={<UpdateUser />} />
        <Route path="/adduser" element={<AddShopOwner />} />
        <Route path="/add/vegetable" element={<Addvegetable />} />
        <Route path="/list/vegetable" element={<Vegetablelist />} />
        <Route path="/edit/vegetable/:id" element={<EditVegetable />} />
        <Route path="/market/vegetable/list" element={<Priceupdate />} />
        <Route path="/shop/list" element={<ShopList />} />
        <Route path="/shop/add" element={<Addshop />} />
        <Route path="/edit/shop/:id" element={<EditShop />} />
        <Route path="/shop/details/:id" element={<ShopDetails />} />
        <Route path="/fertilizer/add/:id" element={<Addfertilizer />} />
      </Routes>
    </div>
  );
}

export default App;
