import { createContext, useContext, useState } from "react";

export const productContext = createContext({
  count: 0,
  handlePlus: () => {},
  handleMinus: () => {},
});


export function ProductContextProvider({ children }) {
  const [count, setCount] = useState(0);
  function handlePlus(count) {
    setCount(count+1);
  }
  function handleMinus(count) {
    setCount(count - 1);
  }
  return (
    <productContext.Provider
      value={{ count, setCount, handlePlus, handleMinus }}
    >
      {children}
    </productContext.Provider>
  );
}

export function useProductContext() {
  const { count, setCount, handlePlus, handleMinus } =
    useContext(productContext);

  return { count, setCount, handlePlus, handleMinus };
}
