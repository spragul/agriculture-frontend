import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../sidebar/sidebar";
import { Loading } from "../../../Pages/Loading";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { backendurl } from "../../../Backendlink";
import axios from "axios"
import { deletegs } from "../../../Redux/governmentSlice";
import { getgovernmentdata } from "../../data/scheme";
import { toast } from "react-toastify";

function GovernmentSchemeList() {
  const [search, setSearch] = useState("");
  const token = sessionStorage.getItem("token");
  const myRole = sessionStorage.getItem("myRole");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allscheme = useSelector((state) => state.governmentapireducer.value);
  const isloading = useSelector((state) => state.governmentapireducer.isLoading);
    //getdata
    async function getdata() {
      let schemedata = await getgovernmentdata(dispatch,token);
      if (schemedata.responses == true) {
        toast.success(schemedata.response.data.message);
      } else {
        console.log(schemedata.error.response.data.message);
        toast.error(schemedata.error.response.data.message);
      }
    }

  async function deleteschemeDetails(ids){
    try {
      const response = await axios.delete(
        `${backendurl}/government/deletegs/${ids}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response);
      if (response.data.rd === true) {
        toast.success(response.data.message);
        dispatch(deletegs(ids));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }

  }
  
  useEffect(()=>{
   if(token){
      if(allscheme.length==0){
        getdata();
      }
   }
  },[])

  return (
    <Sidebar>
      <div>
        <div className="gs-list-container">
          <div className="search-container">
            <input
              placeholder="Search Scheme Name"
              className="search-bar"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="heading-shoplist">
            <h3>Government Schemes</h3>
          </div>
          {isloading ? (
            allscheme
              .filter((item) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.schemename
                      .toLowerCase()
                      .includes(search.toLowerCase());
              })
              .map((item, index) => (
                <div key={index} className="gs-list-card">
                  <div className="gs-image-container">
                    <div><img src={item.image} title={item.schemename} alt={item.schemename}/></div>
                    <div className="gs-text-area">
                      <h3>{item.schemename}</h3>
                      <p>{item.discription}</p>
                      <p>{item.startingdate}</p>
                      <div className="d-grid gap-3 d-md-block">
                        {myRole === "admin" ? (
                          <Button variant="outlined"  color="success"  onClick={() => {
                            deleteschemeDetails(item._id);
                          }} startIcon={<DeleteIcon />}>
                          Delete
                        </Button>
                        ) : (
                          ""
                        )}
                        {myRole === "admin" ? (
                          <Button variant="outlined"  onClick={() => {
                                navigate(`/scheme/edit/${item._id}`)
                              }}
                              color="success"
                          startIcon={<EditIcon />}>
                          Edit
                        </Button>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="d-grid gap-3 d-md-block">
                    <button
                      className="mybutton detailsbutton"
                    
                    >
                      Shop Details
                    </button>
                    {myRole == "owner" ? (
                      <>
                        <button
                          className="mybutton deletebutton"
                        >
                          Delete Shop
                        </button>
                        <button
                          className="mybutton Editbutton"
                          onClick={() => {
                            navigate(`/scheme/edit/${item._id}`);
                          }}
                        >
                          Edit Scheme
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

export default GovernmentSchemeList;
