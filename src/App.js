import Navbar from "./component/Navbar";
import Home from "./component/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Signup from "./component/Signup";
import { UserContextProvider } from "./contextApp/LoginContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginStates from "./contextApp/login/LoginStates";
import ProductStates from "./contextApp/product/ProductStates";
import CartItems from "./component/CartItems";
import OrdersStates from "./contextApp/orders/OrdersStates";
import Orders from "./component/Orders";

function App() {
  return (
    <div>
      <LoginStates>
        <OrdersStates>
          <ProductStates>
            <UserContextProvider>
              <BrowserRouter>
                <Navbar />
                <Routes>
                  <Route exact path="/home" element={<Home />}></Route>
                  <Route exact path="/" element={<Login />}></Route>
                  <Route exact path="/signup" element={<Signup />}></Route>
                  <Route exact path="/orders" element={<Orders />}></Route>
                  <Route
                    exact
                    path="/cartitems"
                    element={<CartItems />}
                  ></Route>
                </Routes>
              </BrowserRouter>
            </UserContextProvider>
          </ProductStates>
        </OrdersStates>
      </LoginStates>
      <ToastContainer />
    </div>
  );
}

export default App;
