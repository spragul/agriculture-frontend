import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Sidebar from "../../sidebar/sidebar";
import axios from "axios";
import { backendurl } from "../../../Backendlink";
import { deletesd } from "../../../Redux/shopSlice";
import { getAllShop } from "../../data/shop";
import { Loading } from "../../../Pages/Loading";

function ShopList() {
  const [search, setSearch] = useState("");
  const token = sessionStorage.getItem("token");
  const myRole = sessionStorage.getItem("myRole");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let isloading = useSelector((state) => state.shopapireducer.isLoading);
  let datas = useSelector((state) => state.shopapireducer.value);
  console.log(datas);
  //getdata
  async function getdata() {
    let shopData = await getAllShop(dispatch, token);
    if (shopData.responses == true) {
      toast.success(shopData.response.data.message);
    } else {
      console.log(shopData.error.response.data.message);
      toast.error(shopData.error.response.data.message);
    }
  }
  //delete shop
  async function deleteShopDetails(ids) {
    try {
      let response = await axios.delete(
        `${backendurl}/shop/deletedata/${ids}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response);
      if (response.data.rd == true) {
        toast.success(response.data.message);
        dispatch(deletesd(ids));
      }
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    if (token) {
      if (isloading) {
      } else {
        getdata();
      }
    }
  }, []);
  return (
    <Sidebar>
      <div>
        <div className="shoplist-container">
          <div className="search-container">
            <input
              placeholder="Search Shop Name"
              className="search-bar"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="heading-shoplist">
            <h3>Fertilizer Pesticide Shop List</h3>
          </div>
          {isloading ? (
            datas
              .filter((item) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.shopname.toLowerCase().includes(search.toLowerCase());
              })
              .map((item, index) => (
                <div key={index} className="shoplist-card">
                  <div>
                    <h3>
                      <span className="key-values">Shop Name</span>:
                      {item.shopname}
                    </h3>
                    <p>
                      <span className="key-values">Branch</span>:{item.branch}
                    </p>
                    <p>
                      <span className="key-values">Mobile</span>:{item.mobile}
                    </p>
                    <p>
                      <span className="key-values">Address</span>:{item.Address}
                    </p>
                  </div>

                  <div className="d-grid gap-3 d-md-block">
                    <button
                      className="mybutton detailsbutton"
                      onClick={() => navigate(`/shop/details/${item._id}`)}
                    >
                      Shop Details
                    </button>
                    {myRole == "owner" ? (
                      <>
                        <button
                          className="mybutton deletebutton"
                          onClick={() => deleteShopDetails(item._id)}
                        >
                          Delete Shop
                        </button>
                        <button
                          className="mybutton Editbutton"
                          onClick={() => {
                            navigate(`/edit/shop/${item._id}`);
                          }}
                        >
                          Edit Shop
                        </button>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ))
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </Sidebar>
  );
}

export default ShopList;
