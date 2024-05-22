import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../sidebar/sidebar";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRipple,
} from "mdb-react-ui-kit";
import { Loading } from "../../../Pages/Loading";
import { getAllreport } from "../../data/soil";
import axios from "axios";
import { backendurl } from "../../../Backendlink";
import { deletesoil } from "../../../Redux/soilSclice";
import { toast } from "react-toastify";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function ReportList() {
  const [search,setSearch]=useState("");
  const dispatch = useDispatch();
  const Allsoil = useSelector((state) => state.soilapireducer.value);
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("myid");
  const token = sessionStorage.getItem("token");
  const myRole=sessionStorage.getItem("myRole");

//fetch reports
  async function getsoildata() {
    let soildata = await getAllreport(dispatch,token,userId);
    if (soildata.responses == true) {
      toast.success(soildata.response.data.message);
    } else {
      console.log(soildata.error.response.data.message);
      toast.error(soildata.error.response.data.message);
    }
  }

  //delete report
  async function deletesoilreport(ids){
      try {
        let response = await axios.delete(
          `${backendurl}/soilreport/deletesr/${ids}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(response);
        if (response.data.rd == true) {
          toast.success(response.data.message);
          dispatch(deletesoil(ids));
        }
      } catch (error) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message);
      }
  }

  useEffect(()=>{
  if(token){
    if(Allsoil.length==0){
      getsoildata();
    }
  }
  },[])

  return (
    <Sidebar>
      <div className="Report-container">
        <div className="search-container">
          <input
            placeholder="Search report Name"
            className="search-bar"
            onChange={(e) => setSearch(e.target.value)}
          ></input>
        </div>
        <MDBContainer fluid className="my-5 text-center list-background">
          <MDBRow>
            {Allsoil.length > 0 ? (
              Allsoil.filter((item) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.soiltest.toLowerCase().includes(search.toLowerCase()) 
              })
              .map((item, index) => (
                <MDBCol key={index} md="6" lg="4" className="mb-4">
                  <MDBCard style={{ marginTop: "10px" }}>
                    <MDBCardBody>
                      <div onClick={() => navigate(`/report/detail/${item._id}`)}>
                        <div className="text-reset">
                          <h5 className="card-title mb-3">{item.soiltest}</h5>
                        </div>
                        <h6 className="mb-3">
                          <span>₹ </span>
                          {item.testreportdate}
                          <span> </span>
                        </h6>
                        <div className="text-reset">
                          <p>{item.submittedby}</p>

                        </div>
                      </div>
                      <div className="d-grid gap-3 d-md-block">
                        {myRole === "admin" ? (
                          <Button variant="outlined"  onClick={() => {
                            deletesoilreport(item._id);
                          }} startIcon={<DeleteIcon />}>
                          Delete
                        </Button>
                        ) : (
                          ""
                        )}
                        {myRole === "admin" ? (
                          <Button variant="outlined"  onClick={() => {
                                navigate(`/report/edit/${item._id}`)
                              }}
                          startIcon={<EditIcon />}>
                          Edit
                        </Button>
                        ) : (
                          ""
                        )}
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              ))
            ) : (
              <Loading />
            )}
          </MDBRow>
        </MDBContainer>
      </div>
    </Sidebar>
  );
}

export default ReportList;
