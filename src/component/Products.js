import React, { useContext, useEffect } from "react";
import ProductContext from "../contextApp/product/ProductContext";

import image from "../../src/images/lappy.jpg";
function Products() {
    const {
      handleQtyPlus,
      handleQtMinus,
      products,
      getallproducts,
      cartItems,
    } = useContext(ProductContext);

      useEffect(() => {
        getallproducts();
        // eslint-disable-next-line
      }, [])
      
  return (
    <div>
      {products.map((element, index) => {
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
              <p className="card-text">{element.description}</p>
              <p className="card-text">Price : ${element.price ? element.price : 'NA'}</p>
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
            </div>
          </div>
        );
      })}
      
    </div>
  );
}

export default Products