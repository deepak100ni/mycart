import React, { useContext } from "react";

import ProductContext from "../contextApp/product/ProductContext";
import Products from "./Products";


function Home() {
    const { cartItems } = useContext(ProductContext);
    // const submitHandel = (e)=>{
    //   e.preventDefault();
    // }
    return (
      <div className="container">
        <nav className="navbar navbar-light bg-light">
          <button type="button" className="btn btn-primary">
            Items <span className="badge badge-light">{cartItems.length}</span>
          </button>
        </nav>
        <Products />
      </div>
    );
}

export default Home;
