import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../sidebar/sidebar";
import { Loading } from "../../../Pages/Loading";
import { toast } from "react-toastify";
import { getAllShop, getAllfertilizer } from "../../data/shop";
import axios from "axios";
import { backendurl } from "../../../Backendlink";
import { deletefp, fetchfpData } from "../../../Redux/fpSlice";
import Table from "react-bootstrap/Table";

function ShopDetails() {
  const [data, setData] = useState({});
  const token = sessionStorage.getItem("token");
  const myrole = sessionStorage.getItem("myRole");
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allshop = useSelector((state) => state.shopapireducer.value);
  const isloading = useSelector((state) => state.shopapireducer.isLoading);
  const fpdatas = useSelector((state) => state.fertilizerapireducer.value);
  const isloadingfp = useSelector((state) => state.fertilizerapireducer.isLoading);
  console.log(fpdatas,isloadingfp);

  //getdata Shop data
  async function getdata() {
    let shopData = await getAllShop(dispatch, token);
    if (shopData.responses == true) {
      toast.success(shopData.response.data.message);
    } else {
      console.log(shopData.error.response.data.message);
      toast.error(shopData.error.response.data.message);
    }
  }

  //get fertlizer data
  async function fpdatageting() {
    let shopData = await getAllfertilizer(dispatch, token, id);
    if (shopData.responses == true) {
      toast.success(shopData.response.data.message);
    } else {
      console.log(shopData.error.response.data.message);
      toast.error(shopData.error.response.data.message);
    }
  }
  //delete fertilizer
  async function deleteFertilizer(ids) {
    try {
      const response = await axios.delete(`${backendurl}/fp/deletefp/${ids}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      if (response.data.rd == true) {
        dispatch(deletefp(ids));
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    if (token) {
      if (allshop.length > 0) {
        let oneshop = allshop.filter((item, index) => item._id == id);
        setData(oneshop[0]);
      } else {
        getdata();
      }

      fpdatageting();
    }
  }, [isloading]);

  return (
    <Sidebar>
      <div>
        <div className="card-header">
          <Link to={`/fertilizer/add/${id}`} className="btn btn-success">
            Add New (+)
          </Link>
        </div>
        {isloading ? (
          <div className="list-fp">
            {fpdatas.length>0 ? (
              <div>
                <h1 className="table-header">Fertilizer List</h1>
                <Table striped bordered hover variant="dark" className="order-table">
                  <thead>
                    <tr>
                      <th>FP ID</th>
                      <th>FP NAME</th>
                      <th>FP discription</th>
                      <th>FP Image</th>
                      <th>FP Price</th>
                      {myrole === "owner" ? <th>Buttons</th> : ""}
                    </tr>
                  </thead>
                  {fpdatas.map((items, index) => (
                    <tbody>
                      <tr key={index}>
                        <td>{items._id}</td>
                        <td>{items.fpName}</td>
                        <td>{items.fpDiscription}</td>
                        <td>
                          <img
                            style={{ width: "50px", height: "50px" }}
                            src={items.fpImage}
                            title={items.fpName}
                            alt={items.fpName}
                          ></img>
                        </td>
                        <td>{items.fpPrice}</td>
                        {myrole === "owner" ? (
                          <div>
                            <button
                              className="mybutton editbutton"
                              onClick={() =>
                                navigate(`/fertilizer/edit/${items._id}`)
                              }
                            >
                              Edit
                            </button>
                            <button
                              className="mybutton deletebutton"
                              onClick={() => deleteFertilizer(items._id)}
                            >
                              Delete
                            </button>
                          </div>
                        ) : (
                          ""
                        )}
                      </tr>
                    </tbody>
                  ))}
                </Table>
              </div>
            ) : (
              <div>
                <h1>Fertilizer List is empty </h1>
              </div>
            )}
          </div>
        ) : (
          <Loading />
        )}

        <div>
          <h3>
            <span className="key-values">Shop Name</span>:{data.shopname}
          </h3>
          <p>
            <span className="key-values">Branch</span>:{data.branch}
          </p>
          <p>
            <span className="key-values">Mobile</span>:{data.mobile}
          </p>
          <p>
            <span className="key-values">Address</span>:{data.Address}
          </p>
        </div>
      </div>
    </Sidebar>
  );
}

export default ShopDetails;
