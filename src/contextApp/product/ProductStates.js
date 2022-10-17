import ProductContext from "./ProductContext";
import { useState } from "react";
const Apiurl = process.env.REACT_APP_API_URL;
const ProductStates = (props) => {
  //Define States
  const [cartItems, setCartItems] = useState([]);
  // const [qty, setQty] = useState(initialValues);
  const [products, setProducts] = useState([]);
  const [loading, setloading] = useState(false);

  const handleQtyPlus = (element) => {
    const exists = cartItems.find((x) => x._id === element._id);
    if (exists) {
      setCartItems(
        cartItems.map((x) =>
          x._id === element._id ? { ...exists, qty: exists.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...element, qty: 1 }]);
    }
  };
  const handleQtMinus = (element) => {
    console.log("handleQtMinus");
    const exists = cartItems.find((x) => x._id === element._id);
    if (exists && exists.qty === 1) {
      setCartItems(cartItems.filter((x) => x._id !== element._id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x._id === element._id ? { ...exists, qty: exists.qty - 1 } : x
        )
      );
    }
  };

  //fetch all products using userId // required auth
  const getallproducts = async () => {
    try {
      setloading(true);
      const response = await fetch(`${Apiurl}products/getallproducts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      setloading(false);
      setProducts(json);
    } catch (error) {
      console.log("====================================");
      console.log("error", error.message);
      console.log("====================================");
    }
  };

  return (
    <ProductContext.Provider
      value={{
        handleQtyPlus,
        handleQtMinus,
        products,
        getallproducts,
        cartItems,
        setCartItems,
        loading,
        setloading,
        setProducts,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductStates;
