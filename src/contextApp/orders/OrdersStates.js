import { useState } from "react";
import OrdersContext from "./OrdersContext";
const APIUrl = process.env.REACT_APP_API_URL;
const OrdersStates = (props) => {
    const [orders, setOrders] = useState([])
    const [product, setProduct] = useState([])
    const getOrders = async () => {
    const orders = await fetch(`${APIUrl}orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem('token'),
      },
    });
    const result = await orders.json();
    setOrders(result);
    };
    const productDetailsById = async (Id) => {
      const orders = await fetch(`${APIUrl}orders/details`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body : {
          productId : Id
        }
      });
      const result = await orders.json();
      setProduct(result);
    };
    return (
      <OrdersContext.Provider
        value={{ orders, getOrders, productDetailsById, product }}
      >
        {props.children}
      </OrdersContext.Provider>
    );
}

export default OrdersStates;