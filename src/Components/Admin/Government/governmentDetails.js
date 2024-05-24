import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getgovernmentdata } from "../../data/scheme";
import { toast } from "react-toastify";
import Sidebar from "../../sidebar/sidebar";
import axios from "axios";
import { backendurl } from "../../../Backendlink";
import { Loading } from "../../../Pages/Loading";
import Table from "react-bootstrap/Table";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { Button } from "@mui/material";


function GovernmentDetails() {
  const [view, setView] = useState("");
  const [detail, setDetail] = useState({});
  const userId = sessionStorage.getItem("myid");
  const token = sessionStorage.getItem("token");
  const userName = sessionStorage.getItem("myname");
  const { id } = useParams();
  const dispatch = useDispatch();
  const allScheme = useSelector((state) => state.governmentapireducer.value);
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
  //delete review
  const deleteReviewdata = async (ids) => {
    console.log(ids);
    try {
      const response = await axios.patch(
        `${backendurl}/government/user/review/delete/${id}`,
        { _id: ids, userid: userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response);
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  //add review
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (view !== "") {
      try {
        const response = await axios.patch(
          `${backendurl}/government/user/review/${id}`,
          { userid: userId, username: userName, details: view },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(response);
        if(response.data.rd===true){
          toast.success(response.data.message);
          let add={ userid: userId, username: userName, details: view,schemeid:id }
          console.log(response.data.governmentss)
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast("type review and add review");
    }
  };

  //getdata
  useEffect(() => {
    if (allScheme.length == 0) {
      getdata();
    } else {
      let seleteddata = allScheme.filter((val) => val._id == id);
      setDetail(seleteddata[0]);
    }
  }, [isloading]);

  return (
    <Sidebar>
      <div className="details-span-container">
        <div>
          {detail ? (
            <div className="details-h">
              <h3>
                <span className="details-span">Scheme Name:</span>
                {detail.schemename}
              </h3>
              <p>
                <span className="details-span">Discription:</span>
                {detail.discription}
              </p>
              <p>
                <span className="details-span"> Scheme starting Date:</span>
                {detail.startingdate}
              </p>
              <p>
                <span className="details-span">Details:</span>
                {detail.details}
              </p>
            </div>
          ) : (
            <Loading />
          )}
        </div>

        <div className="user-reviews">
          <h2>User review</h2>
          {detail.userreview ? (
            <Table striped bordered hover variant="dark" className="order-table">
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Review</th>
                  <th>Button</th>
                </tr>
              </thead>
              {detail.userreview.map((item, index) => (
                <tbody>
                  <tr key={index}>
                    <td>{item.username}</td>
                    <td>{item.details}</td>
                    <td>
                      {item.userid === userId ? (
                        <Button
                          variant="contained"
                          color="error"
                          type="submit"
                          onClick={() => deleteReviewdata(item._id)}
                        >
                          {" "}
                          Delete
                        </Button>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                </tbody>
              ))}
            </Table>
          ) : (
            <Loading />
          )}
        </div>
        <div className="add-user-review">
          <h2>Add Review</h2>
          <form onSubmit={handlesubmit}>
            <input
              name="view"
              type="text"
              className="comments-input"
              placeholder="Enter your comments"
              value={view}
              onChange={(e) => setView(e.target.value)}
            />
            <Button variant="contained" color="success" type="submit">
              Add comments
              <span className="add-comments">
                <AddCommentIcon />
              </span>
            </Button>
          </form>
        </div>
      </div>
    </Sidebar>
  );
}

export default GovernmentDetails;
