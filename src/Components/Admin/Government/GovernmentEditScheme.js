import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Schemefrom from "./Schemefrom";
import { Loading } from "../../../Pages/Loading";
import { getgovernmentdata } from "../../data/scheme";
import Sidebar from "../../sidebar/sidebar";

function GovernmentEditScheme() {
    const [editdata, setEditdata] = useState({});
    const { id } = useParams();
    const userId = sessionStorage.getItem("myid");
    const token = sessionStorage.getItem("token");
    const dispatch = useDispatch();
    let datas = useSelector((state) => state.governmentapireducer.value);
    console.log(datas);
      //fetch reports
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

  //getdata
  useEffect(() => {
    if (datas.length == 0) {
        getdata();
    } else {
      let seleteddata = datas.filter((val) => val._id == id);
      setEditdata(seleteddata[0]);
    }
  }, []);
  return (
    <Sidebar>
    {editdata._id ? <Schemefrom datas={editdata} /> : <Loading />}
  </Sidebar>
  )
}

export default GovernmentEditScheme