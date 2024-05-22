import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllreport } from "../../data/soil";
import { toast } from "react-toastify";
import EditReportForm from "./EditReportForm";
import Sidebar from "../../sidebar/sidebar";
import { Loading } from "../../../Pages/Loading";
import { useParams } from "react-router-dom";

function EditReport() {
  const [editdata, setEditdata] = useState({});
  const { id } = useParams();
  const userId = sessionStorage.getItem("myid");
  const token = sessionStorage.getItem("token");
  const dispatch = useDispatch();
  let datas = useSelector((state) => state.soilapireducer.value);
  console.log(datas);

  //fetch reports
  async function getsoildata() {
    let soildata = await getAllreport(dispatch, token, userId);
    if (soildata.responses == true) {
      toast.success(soildata.response.data.message);
    } else {
      console.log(soildata.error.response.data.message);
      toast.error(soildata.error.response.data.message);
    }
  }

  //getdata
  useEffect(() => {
    if (datas.length == 0) {
      getsoildata();
    } else {
      let seleteddata = datas.filter((val) => val._id == id);
      setEditdata(seleteddata[0]);
    }
  }, []);
  return (
    <Sidebar>
      {editdata._id ? <EditReportForm datas={editdata} /> : <Loading />}
    </Sidebar>
  );
}

export default EditReport;
