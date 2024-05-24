import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../sidebar/sidebar";
import { Loading } from "../../../Pages/Loading";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { backendurl } from "../../../Backendlink";
import axios from "axios";
import { deletegs } from "../../../Redux/governmentSlice";
import { getgovernmentdata } from "../../data/scheme";
import { toast } from "react-toastify";
import AspectRatioIcon from '@mui/icons-material/AspectRatio';

function GovernmentSchemeList() {
  const [search, setSearch] = useState("");
  const token = sessionStorage.getItem("token");
  const myRole = sessionStorage.getItem("myRole");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allscheme = useSelector((state) => state.governmentapireducer.value);
  const isloading = useSelector(
    (state) => state.governmentapireducer.isLoading
  );
  //getdata
  async function getdata() {
    let schemedata = await getgovernmentdata(dispatch, token);
    if (schemedata.responses == true) {
      toast.success(schemedata.response.data.message);
    } else {
      console.log(schemedata.error.response.data.message);
      toast.error(schemedata.error.response.data.message);
    }
  }

  async function deleteschemeDetails(ids) {
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

  useEffect(() => {
    if (token) {
      if (allscheme.length == 0 || allscheme.length == 1) {
        getdata();
      }
    }
  }, []);

  return (
    <Sidebar>
      <div>
        <div className="gss-container">
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
                <div key={index} className="gss-card">
                  <div className="gss-img-container">
                    <img
                      className="gss-img"
                      src={item.image}
                      alt=" "
                      title=""
                    />
                  </div>
                  <div className="gss-details">
                    <h1>{item.schemename}</h1>
                    <h3>{item.discription}</h3>
                    <p>{item.startingdate}</p>
                    <div className="d-grid gap-3 d-md-block">
                      <Button
                        variant="outlined"
                        color="success"
                        onClick={() => navigate(`/scheme/details/${item._id}`)}
                        startIcon={<AspectRatioIcon />}
                      >
                        Shop Details
                      </Button>

                      {myRole === "admin" ? (
                        <Button
                          variant="outlined"
                          color="success"
                          onClick={() => {
                            deleteschemeDetails(item._id);
                          }}
                          startIcon={<DeleteIcon />}
                        >
                          Delete
                        </Button>
                      ) : (
                        ""
                      )}
                      {myRole === "admin" ? (
                        <Button
                          variant="outlined"
                          onClick={() => {
                            navigate(`/scheme/edit/${item._id}`);
                          }}
                          color="success"
                          startIcon={<EditIcon />}
                        >
                          Edit
                        </Button>
                      ) : (
                        ""
                      )}
                    </div>
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
