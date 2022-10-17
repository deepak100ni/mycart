import LoginContext from "./LoginContext";
import { toast } from "react-toastify";
import { useState } from "react";
const apiUrl = process.env.REACT_APP_API_URL;
const LoginStates = (props) => {
  const USER = { name: "Guest", isGuestUser: true };
  const [user, setUser] = useState(USER);
  const login = async (data) => {
    // Default options are marked with *
    try {
      const response = await fetch(`${apiUrl}users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.errors && result.errors.length > 0) {
        return toast(result.errors[0].msg);
      }
      if (result.token !== "" && result.success === true) {
        const userDetails = await fetch(`${apiUrl}users/userdetails`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: result.token,
          },
        });
        const resultUserDetails = await userDetails.json();
        setUser({ name: resultUserDetails.userDetails.name, isGuestUser: false });
        console.log("resultUserDetails", resultUserDetails);
        localStorage.setItem("token", result.token);
        localStorage.setItem("auth", "true");
        return true;
        // navigate("/");
      } else {
        toast(result.message);
      }
    } catch (error) {
      //   res.status(500).json({ error });
      toast(error.message);
    }
  };
  const logOut = () => {
    setUser(USER);
    localStorage.setItem("qty", 0);
    localStorage.setItem("token", '');
  };

  return (
    <LoginContext.Provider value={{ user,login, logOut }}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginStates;
