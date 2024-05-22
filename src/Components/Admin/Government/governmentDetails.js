import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getgovernmentdata } from "../../data/scheme";
import { toast } from "react-toastify";
import Sidebar from "../../sidebar/sidebar";
import axios from "axios";
import { backendurl } from "../../../Backendlink";
import { Loading } from "../../../Pages/Loading";

function GovernmentDetails() {
  const [view, setView] = useState("");
  const [detail, setDetail] = useState({});
  const userId = sessionStorage.getItem("myid");
  const token = sessionStorage.getItem("token");
  const userName = sessionStorage.getItem("myname");
  const { id } = useParams();
  const dispatch = useDispatch();
  const allScheme = useSelector((state) => state.governmentapireducer.value);

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

  //add review
  async function addreview(e) {
    e.priventdefault();
    if (view !== "") {
      try {
        const response = await axios.patch(
          `${backendurl}/government/user/review/${id}`,
          { userid: userId, username: userName, details: view },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    } else {
      toast("type review and add review");
    }
  }

  //getdata
  useEffect(() => {
    if (allScheme.length == 0) {
      getdata();
    } else {
      let seleteddata = allScheme.filter((val) => val._id == id);
      setDetail(seleteddata[0]);
    }
  }, []);

  return (
    <Sidebar>
      <div>
        <div>
          {detail ? (
            <div>
              <h3><span>Scheme Name</span>{detail.schemename}</h3>
              <p><span>Discription</span>{detail.discription}</p>
              <p><span> Scheme starting Date</span>{detail.startingdate}</p>
              <p><span>Details</span>{detail.details}</p>
            </div>
          ) : (
            <Loading />
          )}
        </div>
        <div>
          <form>
            <input
              type="text"
              placeholder="Enter your comments"
              value={view}
              onChange={(e) => e.target.value}
            />
            <button type="submit" className="btn" onClick={() => addreview()}>
              Add comments
            </button>
          </form>
        </div>
      </div>
    </Sidebar>
  );
}

export default GovernmentDetails;
