import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Sidebar from "../../sidebar/sidebar";
import { Button } from "@mui/material";
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
      if (datas.length > 0) {
      } else {
        getdata();
      }
    }
  }, []);
  return (
    <Sidebar>
      <div className="shoplist-container">
      <div className="search-container">
          <input
            placeholder="Search vegetables"
            className="search-bar"
            onChange={(e) => setSearch(e.target.value)}
          ></input>
        </div>
        {datas.length > 0 ? (
          datas
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.name.toLowerCase().includes(search.toLowerCase()) ||
                    item.categories
                      .toLowerCase()
                      .includes(search.toLowerCase());
            })
            .map((item, index) => (
              <div key={index} className="shoplist-card">
                <div>
                  <h3>{item.shopname}</h3>
                  <p>{item.mobile}</p>
                  <p>{item.Addresss}</p>
                </div>

                <div className="d-grid gap-3 d-md-block">
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Shop Details
                  </Button>
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
    </Sidebar>
  );
}

export default ShopList;
