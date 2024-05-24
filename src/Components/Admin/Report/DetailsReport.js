import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../../sidebar/sidebar";
import { Loading } from "../../../Pages/Loading";
import { getAllreport } from "../../data/soil";


function DetailsReport() {
  const [detail, setDetail] = useState({});
  const userId = sessionStorage.getItem("myid");
  const token = sessionStorage.getItem("token");
  const { id } = useParams();
  const dispatch = useDispatch();
  const Allsoil = useSelector((state) => state.soilapireducer.value);
  const isloading = useSelector(
    (state) => state.soilapireducer.isLoading
  );
  console.log(detail)


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
    if (Allsoil.length == 0||Allsoil.length == 1) {
        getsoildata()
    } else {
      let seleteddata = Allsoil.filter((val) => val._id == id);
      setDetail(seleteddata[0]);
    }
  }, [isloading]);

  return (
    <Sidebar >
      <div className="details-span-p-container">
        <div>
          {detail ? (
            <div className="details-h">
              <h3>
                <span className="details-span">soil test Name:</span>
                {detail.soiltest}
              </h3>
              <p>
                <span className="details-span">submitted by:</span>
                {detail.submittedby}
              </p>
              <p>
                <span className="details-span"> toastifyest report date:</span>
                {detail.testreportdate.split("T")[0]}
              </p>
              <p>
                <span className="details-span">Report details:</span>
                {detail.reportdetails}
              </p>
            </div>
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </Sidebar>
  );
}

export default DetailsReport;
