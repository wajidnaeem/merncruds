import React, { useState } from "react";
import axios from "axios";
import { NavLink, useHistory } from "react-router-dom";
const Login = ({ setLoginUser }) => {
  const history = useHistory();
  const [inpval, setINP] = useState({
    email: "",
    password: "",
  });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setINP({
  //     ...inpval, //spread operator
  //     [name]: value,
  //   });
  // };

  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const login = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8003/login", inpval).then((res) => {
      console.log("res:: ", res);
      alert(res.data.msg);
      setLoginUser(res.data.data);
      history.push("/cruds");
    });
  };
  return (
    <>
      <div className="container">
        <NavLink to="/cruds">CRUDS - REGISTER</NavLink>
        <form className="mt-4">
          <div className="row">
            <div class="mb-3 col-lg-6 col-md-6 col-12">
              <label for="exampleInputPassword1" class="form-label">
                email
              </label>
              <input
                type="email"
                value={inpval.email}
                onChange={setdata}
                name="email"
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div class="mb-3 col-lg-6 col-md-6 col-12">
              <label for="password" class="form-label">
                password
              </label>
              <input
                type="password"
                value={inpval.password}
                onChange={setdata}
                name="password"
                class="form-control"
                id="password"
              />
            </div>

            <button type="submit" onClick={login} class="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default Login;
