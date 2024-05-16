import React, { useState } from "react";
import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import Sidebar from "../../sidebar/sidebar";

function Priceupdate() {
  const [price, setPrice] = useState(0);
  const datas = useSelector((state) => state.vegetableapireducer.value);
  console.log(price)

  const change=()=>{
    console.log(price)
  }
  return (
    <Sidebar>
      <div>
        <h1 className="table-header">Vegetable List</h1>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>vegetable ID</th>
              <th>vegetable NAME</th>
              <th>Categories</th>
              <th>Image</th>
              <th>Price</th>
              <th>Change price</th>
            </tr>
          </thead>
          {datas.map((items, index) => (
            <tbody>
              <tr key={index}>
                <td>{items._id}</td>
                <td>{items.name}</td>
                <td>{items.categories}</td>
                <td>
                  <img
                    style={{ width: "50px", height: "50px" }}
                    src={items.image}
                    title={items.name}
                    alt={items.name}
                  ></img>
                </td>
                <td>{items.price}</td>
                <td>
                  <form className="chage-price-from">
                    <input
                    type="number"
                    name="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="chage vegetable price"
                    />
                    <button
                      className="mybutton deletebutton"
                      onClick={() => change()}
                    >
                      submit
                    </button>
                  </form>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      </div>
    </Sidebar>
  );
}

export default Priceupdate;
