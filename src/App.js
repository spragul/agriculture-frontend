import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login/login";
import SignIn from "./Pages/Signup/signup";
import { Forgot } from "./Pages/ForgotPassword/ForgotPassword";
import Reset from "./Pages/ResetPassword/ResetPassword";
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
import EditFertilizerShop from "./Components/shops/fettilizer/Editfertilizer";
import Addreport from "./Components/Admin/Report/Addreport";
import ReportList from "./Components/Admin/Report/ReportList";
import EditReport from "./Components/Admin/Report/EditReport";
import GovernmentSchemeAdd from "./Components/Admin/Government/GovernmentSchemeAdd";
import GovernmentEditScheme from "./Components/Admin/Government/GovernmentEditScheme";
import GovernmentSchemeList from "./Components/Admin/Government/GovernmentSchemeList";
import GovernmentDetails from "./Components/Admin/Government/governmentDetails";
import Userlist from "./Components/Admin/admin";
import AddShopOwner from "./Components/Admin/shop/AddShopOwner/AddShopOwner";
import Firstpage from "./Pages/Firstpage";
import DetailsReport from "./Components/Admin/Report/DetailsReport";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Firstpage />} />
        <Route path="/dashboard" element={<GovernmentSchemeList />} />
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
        <Route path="/fertilizer/edit/:id" element={<EditFertilizerShop />} />
        <Route path="/report/add" element={<Addreport />} />
        <Route path="/report/list" element={<ReportList />} />
        <Route path="/report/edit/:id" element={<EditReport />} />
        <Route path="/scheme/add" element={<GovernmentSchemeAdd />} />
        <Route path="/scheme/edit/:id" element={<GovernmentEditScheme />} />
        <Route path="/scheme/details/:id" element={<GovernmentDetails />} />
        <Route path="/admin" element={<Userlist />} />
        <Route path="/report/detail/:id" element={<DetailsReport />} />
      </Routes>
    </div>
  );
}

export default App;
