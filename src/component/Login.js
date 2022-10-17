import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoginContext from "../contextApp/login/LoginContext";
localStorage.removeItem("auth");
localStorage.removeItem("token");
const Login = () => {
  const context = useContext(LoginContext);
  const { login } = context;
  const navigate = useNavigate();
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  // const { logIn } = useUserContext();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log("formValues", formValues);
  };

  const handleSubmit = async (e) => {
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    e.preventDefault();
  };


  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // finalLogin();
      const result = login({
        email: formValues.email,
        password: formValues.password,
      });
      result.then(function (result) {
        if (result === true) {
          toast("Login Successfully");
          setTimeout(() => {
            navigate("/home");
          }, 3000);
        }
      });
    }
    // eslint-disable-next-line
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    // const regex = (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test($('#email').val())
    if (!values.email) {
      errors.email = "Email is required";
    }
    if (!values.password) {
      errors.password = "password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password length should be 4 chars";
    }
    return errors;
  };

  return (
    <div className="container mx-2">
      <center className="my-2">
        <h4>Login to go to MyCart</h4>
      </center>
      <div className="rows">
        <center>
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                  onChange={handleOnChange}
                  value={formValues.email}
                />
              </div>
              <p>{formErrors.email}</p>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  onChange={handleOnChange}
                  value={formValues.password}
                />
              </div>
              <p>{formErrors.password}</p>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </center>
      </div>
    </div>
  );
};
export default Login;


  // const finalLogin = async (
  //   req,
  //   res,
  //   url = "",
  //   data = { email: formValues.email, password: formValues.password }
  // ) => {
  //   // Default options are marked with *
  //   try {
  //     const response = await fetch(`${apiUrl}users/login`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });
  //     const result = await response.json();
  //     if (result.errors && result.errors.length > 0) {
  //       return toast(result.errors[0].msg);
  //     }
  //       if (result.token !== "" && result.success === true) {
  //         const userDetails = await fetch(`${apiUrl}users/userdetails`, {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //             token: result.token,
  //           },
  //         });
  //         const resultUserDetails = await userDetails.json();
  //         logIn(resultUserDetails.userDetails.name);
  //         localStorage.setItem("token", result.token);
  //         localStorage.setItem("auth", "true");
  //         navigate("/");
  //       } else {
  //         toast(result.message);
  //       }
  //   } catch (error) {
  //   //   res.status(500).json({ error });
  //   toast(error.message);
  //   }
  // };
