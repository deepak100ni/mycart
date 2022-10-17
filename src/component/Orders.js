import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import image from "../../src/images/lappy.jpg";
import OrdersContext from "../contextApp/orders/OrdersContext";
const moment = require("moment");

const Orders = () => {
  const context = useContext(OrdersContext);
  const { orders, getOrders } = context;
  useEffect(() => {
    getOrders();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      {orders.map((element, index) => {
        return (
          <div className="container mx-2 my-2" key={index}>
            <div className="card text-center">
              <div className="card-header">
                <img
                  className="card-img-top"
                  src={image}
                  alt="Card"
                  style={{ height: "100px", width: "100px" }}
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">{element.title}</h5>
                <p className="card-text">{element.description}</p>
                <p className="card-text">Quantity : {element.qty}</p>
                <p className="card-text">
                  {moment(element.date).format("llll")}
                </p>
                <p className="card-text">
                  {moment(element.date).startOf("hour").fromNow()}
                </p>
                <Link to="#!" className="btn btn-primary">
                  See Product
                </Link>
              </div>
              <div className="card-footer text-muted">
                {moment(element.date).startOf("hour").fromNow()}
              </div>
            </div>
          </div>
        );
      })}
      
    </div>
  );
};

export default Orders;
