import {
  FaUserSecret,
  FaRegEdit,
  FaBookReader,
  FaRegFileAlt,
  FaVolleyballBall,
  FaShoppingCart,
  FaLuggageCart,
  FaCarrot,
} from "react-icons/fa";
import { MdAgriculture } from "react-icons/md";
import { GiFarmer } from "react-icons/gi";
import { FaRegIdCard } from "react-icons/fa6";
import HomeIcon from "@mui/icons-material/Home";
import GrainIcon from "@mui/icons-material/Grain";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import StoreIcon from "@mui/icons-material/Store";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import { NavLink, useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import "./sidebar.css";
import { useState } from "react";
import {useDispatch} from "react-redux"
import { resetgsdata } from "../../Redux/governmentSlice";
import { resetspdata } from "../../Redux/fpSlice";
import { resetsddata } from "../../Redux/shopSlice";
import { resetvegdata } from "../../Redux/vegetableSlice";
import { resetsoildata } from "../../Redux/soilSclice";

function Sidebar({ children }) {
  const Name = sessionStorage.getItem("myName");
  const MyRole = sessionStorage.getItem("myRole");
  const admins = [
    {
      path: "/",
      name: "Dashboard",
      icon: <FaBookReader />,
    },
    {
      path: "/list/vegetable",
      name: "Vegetable list",
      icon: <FaCarrot />,
    },
    {
      path: "/admin",
      name: "Admin",
      icon: <FaUserSecret />,
    },
    {
      path: "/adduser",
      name: "Add user",
      icon: <PersonAddAltIcon />,
    },
    {
      path: "/shop/list",
      name: "Shop List",
      icon: <StoreIcon />,
    },
    {
      path: "/report/add",
      name: "Add Report",
      icon: <FaBookReader />,
    },
    {
      path: "/report/list",
      name: "Report list",
      icon: <GrainIcon />,
    },
    {
      path: "/scheme/list",
      name: "Schemes",
      icon: <MdAgriculture />,
    },
    {
      path: "/scheme/add",
      name: "Add Scheme",
      icon: <FaRegIdCard />,
    },
  ];
  const market = [
    {
      path: "/",
      name: "Dashboard",
      icon: <FaBookReader />,
    },
    {
      path: "/add/vegetable",
      name: "Add vegetable",
      icon: <FaShoppingCart />,
    },
    {
      path: "/list/vegetable",
      name: "List of vegetable",
      icon: <FaCarrot />,
    },
    {
      path: "/market/vegetable/list",
      name: "vegetable price",
      icon: <FaLuggageCart />,
    },
    {
      path: "/shop/list",
      name: "Shop List",
      icon: <StoreIcon />,
    },
    {
      path: "/report/list",
      name: "Report list",
      icon: <GrainIcon />,
    },
    {
      path: "/scheme/list",
      name: "Schemes",
      icon: <MdAgriculture />,
    },
  ];
  const shop = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <FaBookReader />,
    },
    {
      path: "/list/vegetable",
      name: "vegetable list",
      icon: <FaCarrot />,
    },
    {
      path: "/shop/list",
      name: "Shop List",
      icon: <StoreIcon />,
    },
    {
      path: "/shop/add",
      name: "Add Shop",
      icon: <AddBusinessIcon />,
    },
    {
      path: "/report/list",
      name: "Report list",
      icon: <GrainIcon />,
    },
    {
      path: "/scheme/list",
      name: "Schemes",
      icon: <MdAgriculture />,
    },
  ];

  const users = [
    {
      path: "/",
      name: "Dashboard",
      icon: <FaBookReader />,
    },
    {
      path: "/list/vegetable",
      name: "vegetable list",
      icon: <FaCarrot />,
    },
    {
      path: "/shop/list",
      name: "Shop List",
      icon: <StoreIcon />,
    },
    {
      path: "/report/list",
      name: "Report list",
      icon: <GrainIcon />,
    },
    {
      path: "/scheme/list",
      name: "Schemes",
      icon: <MdAgriculture />,
    },
  ];

  return (
    <div className="sid-container">
      <div className="sidebar">
        <div className="top_section">
          <div className="icon">
            <GiFarmer />
          </div>
          <div className="link d-none d-sm-inline">Agriculture App </div>
        </div>
        {MyRole === "admin" ? (
          admins.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="link text-deactron"
              activeclassName="active"
            >
              <div className="icon">{item.icon}</div>
              <div className="ms-3 d-none d-sm-inline">{item.name}</div>
            </NavLink>
          ))
        ) : (
          <>
            {MyRole === "market" ? (
              market.map((item, index) => (
                <NavLink
                  to={item.path}
                  key={index}
                  className="link text-deactron"
                  activeclassName="active"
                >
                  <div className="icon">{item.icon}</div>
                  <div className="ms-3 d-none d-sm-inline">{item.name}</div>
                </NavLink>
              ))
            ) : (
              <>
                {MyRole === "owner"
                  ? shop.map((item, index) => (
                      <NavLink
                        to={item.path}
                        key={index}
                        className="link text-deactron"
                        activeclassName="active"
                      >
                        <div className="icon">{item.icon}</div>
                        <div className="ms-3 d-none d-sm-inline">
                          {item.name}
                        </div>
                      </NavLink>
                    ))
                  : users.map((item, index) => (
                      <NavLink
                        to={item.path}
                        key={index}
                        className="link text-deactron"
                        activeclassName="active"
                      >
                        <div className="icon">{item.icon}</div>
                        <div className="ms-3 d-none d-sm-inline">
                          {item.name}
                        </div>
                      </NavLink>
                    ))}
              </>
            )}
          </>
        )}
      </div>

      <main>
        <NavScrollExample title={Name} />
        {children}
        <Footer />
      </main>
    </div>
  );
}

export default Sidebar;

export function NavScrollExample({ title }) {
  const navigate = useNavigate();
  const MyRole = sessionStorage.getItem("myRole");
  const [change, setChange] = useState(false);
  const dispatch=useDispatch()
  console.log(change);
  const changesty = () => {
    if (change == true) {
      setChange(false);
    } else {
      setChange(true);
    }
  };
  function logout() {
    sessionStorage.clear();
   dispatch(resetspdata([]))
   dispatch(resetgsdata([]));
   dispatch(resetsddata([]));
   dispatch(resetsoildata([]));
   dispatch(resetvegdata([]));
    navigate("/login");
  }
  function adminlogin() {
    if (MyRole === "admin") {
      alert("You are Admin");
    } else {
      sessionStorage.clear();
      navigate("/login");
    }
  }

  return (
    <div>
      <Navbar className="nav-clr" expand="lg">
        <Container fluid>
          <Navbar.Brand
            href="#"
            style={{ color: "gold", fontSize: "30px" }}
            className="title"
          >
            {title}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" >
          <span>
              <MenuIcon />
            </span>
          </Navbar.Toggle>
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <button
                class="btn btn-outline-warning me-2"
                type="button"
                onClick={() => navigate("/")}
              >
                <span>
                  <HomeIcon />
                </span>
                Home
              </button>
              {MyRole === "user" ? (
                <button
                  class="btn btn-outline-warning me-2"
                  type="button"
                  onClick={() => navigate("/list/vegetable")}
                >
                  {" "}
                  <div className="icon"></div>
                  <FaShoppingCart />
                  vegetable
                </button>
              ) : (
                ""
              )}
            </Nav>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 profile-menu">
              <li className="nav-item dropdown">
                <button
                  className={`nav-link dropdown-toggle ${
                    change === true ? "show" : ""
                  }`}
                  id="navbarDropdown"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded={change}
                  value={change}
                  onClick={(e) => changesty()}
                >
                  <div className="profile-pic">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz-dSbbpNWBQ8jn0wehN-QYp2CjBSHgdgeRw&s"
                      alt="Profile Picture"
                    />
                  </div>
                </button>
                <ul
                  className={`dropdown-menu ${change === true ? "show" : ""}`}
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <button className="dropdown-item" type="button" onClick={()=>navigate("/updateuser")}>
                      <PersonIcon/> Account
                    </button>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item" type="button" onClick={()=>logout()}>
                      <LogoutIcon/> Log Out
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export function Footer() {
  return (
    <div>
      <footer className="contact-container">
        contact us
        <div>email : spragul33@gmail.com</div>
        <div>phone : 9788652355</div>
      </footer>
    </div>
  );
}
