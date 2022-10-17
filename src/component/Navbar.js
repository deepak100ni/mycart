import React, { useContext } from "react";
import { Link } from "react-router-dom";
import LoginContext from "../contextApp/login/LoginContext";
import ProductContext from "../contextApp/product/ProductContext";

// import { useUserContext } from "../contextApp/LoginContext";
// import { useProductContext } from "../contextApp/productContext";


function Navbar() {
  const context = useContext(LoginContext);
  const productData = useContext(ProductContext);
  // console.log("productData", productData);
  const { cartItems } = productData;
  const { user,logOut } = context;
  // console.log("count", count);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          MyCart
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {user.isGuestUser === false ? (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cartitems">
                  CartItems
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/orders">
                  Orders
                </Link>
              </li>
            </ul>
          ) : (
            ""
          )}
          <ul className="navbar-nav" style={{ marginLeft: "986px" }}>
            <li>
              <strong>Welcome, {user.name}</strong>
            </li>
          </ul>
          {user.isGuestUser === false && (
            <Link className="btn btn-primary" to="/cartitems">
              <i className="fa fa-shopping-cart" aria-hidden="true">
                <sup style={{ top: "-1em" }}>{cartItems.length}</sup>
              </i>

              <span className="badge badge-secondary"></span>
            </Link>
          )}
          {user.isGuestUser === true ? (
            <form className="form-inline my-2 my-lg-0">
              <Link className="btn btn-dark my-2 my-sm-0 mx-2" to="/signup">
                Signup
              </Link>
              <Link className="btn btn-warning  my-sm-0 mx-2" to="/">
                Login
              </Link>
            </form>
          ) : (
            <form className="form-inline my-2 my-lg-0">
              <Link
                className="btn btn-dark my-2 my-sm-0 mx-2"
                to="/"
                onClick={() => {
                  logOut();
                }}
              >
                Logout
              </Link>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
