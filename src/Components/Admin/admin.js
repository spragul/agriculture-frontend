import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { toast } from "react-toastify";
import { backendurl } from "../../Backendlink";
import { Loading } from "../../Pages/Loading";
import Sidebar from "../sidebar/sidebar";

function Userlist() {
  const [data, setData] = useState([]);
  const myid = sessionStorage.getItem("myid");
  const token = sessionStorage.getItem("token");

  //userList
  async function fetchinguserDetails() {
    try {
      let response = await axios.get(`${backendurl}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      if (response.data.rd == true) {
        toast.success(response.data.message);
        setData(response.data.user);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  }
  useEffect(() => {
    fetchinguserDetails();
  }, []);
  return (
    <Sidebar>
      {data.length > 0 ? (
        <div>
          <h2>User list</h2>
          <Table
            responsive
            striped
            bordered
            hover
            variant="dark"
            className="order-table"
          >
            <thead>
              <tr>
                <th>S.No</th>
                <th>name</th>
                <th>email</th>
                <th>role</th>
                <th> mobile</th>
                <th>date</th>
                <th>land </th>
              </tr>
            </thead>
            <tbody>
              {data.map((tableItem, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{tableItem.name}</td>
                  <td>{tableItem.email}</td>
                  <td>{tableItem.role}</td>
                  <td>{tableItem.mobile}</td>
                  <td>{tableItem.date}</td>
                  <td>
                    {tableItem.land}
                    <span>cents</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <Loading />
      )}
    </Sidebar>
  );
}

export default Userlist;
