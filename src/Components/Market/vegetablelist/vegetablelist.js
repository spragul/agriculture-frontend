import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRipple,
} from "mdb-react-ui-kit";
import Sidebar from "../../sidebar/sidebar";
import { deleteVegetableData,getvegetale } from "../../data/vegetable";
import { toast } from "react-toastify";

function Vegetablelist() {
  const token = sessionStorage.getItem("token");
  const myRole = sessionStorage.getItem("myRole");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isloading = useSelector((state) => state.vegetableapireducer.isLoading);
  let datas = useSelector((state) => state.vegetableapireducer.value);

  //getdata
  async function getdata() {
    let vegetabledata = await getvegetale(dispatch);
    if (vegetabledata.responses == true) {
      toast.success(vegetabledata.response.data.message);
    } else {
      console.log(vegetabledata.error.response.data.message);
      toast.error(vegetabledata.error.response.data.message);
    }
  }

  //delete vegetable
  async function deletevegetable(id) {
    let dcall = await deleteVegetableData(id, dispatch);
    if (dcall.responses == true) {
      toast.success(dcall.response.data.message);
    } else {
      console.log(dcall.error.response.data.message);
      toast.error(dcall.error.response.data.message);
    }
  }

  useEffect(() => {
    if (token) {
      if (datas.length == 0) {
        getdata();
      }
    } else {
      alert("Login here");
    }
  }, []);

  return (
    <Sidebar>
      <div>
        <MDBContainer fluid className="my-5 text-center list-background">
          <MDBRow>
            {datas.length > 0 ? (
              datas.map((item, index) => (
                <MDBCol key={index} md="6" lg="4" className="mb-4">
                  <MDBCard style={{ marginTop: "10px" }}>
                    <MDBRipple
                      type="button"
                      onClick={() => navigate(`/detail/${item._id}`)}
                      rippleColor="light"
                      rippleTag="div"
                      className="bg-image rounded hover-zoom"
                    >
                      <MDBCardImage
                        src={item.image}
                        fluid
                        style={{
                          width: "300px",
                          height: "300px",
                          marginTop: "15px",
                        }}
                      />
                      <div>
                        <div className="mask">
                          <div class="d-flex justify-content-start align-items-end h-100"></div>
                        </div>
                        <div className="hover-overlay">
                          <div
                            className="mask"
                            style={{
                              backgroundColor: "rgba(251, 251, 251, 0.15)",
                            }}
                          ></div>
                        </div>
                      </div>
                    </MDBRipple>
                    <MDBCardBody>
                      <div onClick={() => navigate(`/detail/${item._id}`)}>
                        <div className="text-reset">
                          <h5 className="card-title mb-3">{item.name}</h5>
                        </div>
                        <div className="text-reset">
                          <p>{item.category}</p>
                        </div>
                        <h6 className="mb-3">
                          <span>₹ </span>
                          {item.price}
                        </h6>
                      </div>
                      <div className="d-grid gap-3 d-md-block">
                        <button
                          className="btn"
                          onClick={() => {
                            navigate(`/details/vegetable/${item._id}`);
                          }}
                        >
                          Details
                        </button>
                        {myRole === "market" ? (
                          <button
                            className="btn"
                            onClick={() => {
                              deletevegetable(item._id);
                            }}
                          >
                            delete
                          </button>
                        ) : (
                          ""
                        )}
                        {myRole === "market" ? (
                          <button
                            className="btn"
                            onClick={() => {
                              navigate(`/edit/vegetable/${item._id}`);
                            }}
                          >
                            Edit
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              ))
            ) : (
              <div>Loading</div>
            )}
          </MDBRow>
        </MDBContainer>
      </div>
    </Sidebar>
  );
}

export default Vegetablelist;
