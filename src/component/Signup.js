import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
const apiUrl = process.env.REACT_APP_API_URL;
const Signup = () => {
  const navigate = useNavigate();
  const initialValues = {email:"",name:"",password:""}
  const [formValues, setformValues] = useState(initialValues);
  const [formErrors, setformErrors] = useState({})
  const [isSubmit, setisSubmit] = useState(false)
  const handleSubmit = (e)=>{
    e.preventDefault();
    setisSubmit(true);
    setformErrors(validate(formValues));
  }
  const validate = (values) =>{
    const errors = {};
    if(!values.name){
      errors.name = "Please Enter Name";
    }
    if(!values.email){
      errors.email = "Please Enter Email"
    }
    if(!values.password){
      errors.password = "Please Enter Password"
    }
    return errors;
  }
  const handleLogin  = async ()=>{
    const { name, email, password } = formValues;
    const data = {email : email, password : password, name : name}
    const response = await fetch(`${apiUrl}users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
      if(result.success){
        toast(result.message);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }else{
        toast(result.message);
      }
  }
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
       handleLogin();
    }
    // eslint-disable-next-line
  }, [formErrors])
  
  const handleOnChange = (element) =>{
    console.log('element',element.target);
    const { name,value } = element.target;
    setformValues({ ...formValues, [name]: value });
  }
  return (
    <div className="container">
      <h3>Welcome to MyCart, Join us today</h3>
      <form className="mx-2 my-2" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Email address</label>
          <input
            type="text"
            name="name"
            value={formValues.name}
            className="form-control"
            id="name"
            placeholder="Enter Name"
            onChange={handleOnChange}
          />
          <small>{formErrors.name}</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            name="email"
            value={formValues.email}
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={handleOnChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
          <br/>
          <small>{formErrors.email}</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            name="password"
            value={formValues.password}
            className="form-control"
            id="password"
            placeholder="Password"
            onChange={handleOnChange}
          />
        </div>
        <small>{formErrors.password}</small>
        <br/>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup