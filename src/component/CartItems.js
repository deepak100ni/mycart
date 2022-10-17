import React, { useContext } from "react";
import ProductContext from "../contextApp/product/ProductContext";
import { toast } from "react-toastify";

import image from "../../src/images/lappy.jpg";

const apiUrl = process.env.REACT_APP_API_URL;

const CartItems = () => {
  const {setCartItems, cartItems, handleQtMinus, handleQtyPlus } =
    useContext(ProductContext);
  const handlePurchase = async (id) => {
     const exists = cartItems.find((x) => x._id === id);
     const {qty,title,description,price,comments} = exists;
    const response = await fetch(`${apiUrl}userproducts/addProduct/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        qty,
        title,
        description,
        price: qty * price,
        comments,
      }),
    });
    const result = await response.json();
   if (result.success){
    if (exists) {
      setCartItems(cartItems.filter((x) => x._id !== id));
    }
   }     
      toast(result.message);
  };

  return (
    <div className="container">
      {cartItems.length === 0 && "No Cart Items"}
      {cartItems.length !== 0 &&
        cartItems.map((element, index) => {
          return (
            <div className="card mx-2 my-2" key={index}>
              <img
                className="card-img-top"
                src={image}
                alt="Card"
                style={{ height: "100px", width: "100px" }}
              />
              <div className="card-body">
                <h5 className="card-title">{element.title}</h5>
                <p className="card-text">
                  Price ${element.price ? element.price : "NA"}
                </p>
                <p>{element.price ? element.price * element.qty : "NA"}</p>
                <button
                  className="btn btn-danger"
                  // disabled={qty.qty === 0 ? "disabled" : ""}
                  onClick={() => {
                    handleQtMinus(element);
                  }}
                >
                  -
                </button>

                <span className="badge badge-pill badge-dark bg-dark">
                  {cartItems.map((x) => x._id === element._id && x.qty)}
                </span>
                <button
                  className="btn btn-warning"
                  onClick={() => {
                    handleQtyPlus(element);
                  }}
                >
                  +
                </button>
                <div style={{float:'right'}}>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      handlePurchase(element._id);
                    }}
                  >
                    Purchase
                  </button>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default CartItems;
