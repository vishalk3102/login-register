import React, { useState } from "react";
import "../Components/Register.css";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { IoCallOutline } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import signup from "../Assets/signup.jpg";
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: "",
  });

  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };
  const submitData = async (e) => {
    e.preventDefault();
    const { name, email, phone, password, confirmpassword } = user;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        phone: phone,
        password: password,
        confirmpassword: confirmpassword,
      }),
    });
    const data = await res.json();
    if (data.status === 422 || !data) {
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
    } else {
      window.alert("Registration Successfull ");
      console.log("Successfull Registration");

      navigate("/login");
    }
  };

  return (
    <>
      <section className="signup-section">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-12 signup-form">
              <div className="row">
                <div className="col-lg-6 col-md-12 col-12 signup-content order-lg-1 order-2">
                  <h2>Sign Up</h2>
                  <form method="POST" action="" className="register-form">
                    <div className="form-group">
                      <label htmlFor="name">
                        <i>
                          <AiOutlineUser />
                        </i>
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        autoCorrect="off"
                        value={user.name}
                        onChange={handleInputs}
                        placeholder="Your Name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">
                        <i>
                          <HiOutlineMail />
                        </i>
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        autoCorrect="off"
                        value={user.email}
                        onChange={handleInputs}
                        placeholder="Your Email"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="Phone">
                        <i>
                          <IoCallOutline />
                        </i>
                      </label>
                      <input
                        type="Number"
                        name="phone"
                        id="phone"
                        autoCorrect="off"
                        value={user.phone}
                        onChange={handleInputs}
                        placeholder="Your Mobile Number"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">
                        <i>
                          <AiOutlineLock />
                        </i>
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        autoCorrect="off"
                        value={user.password}
                        onChange={handleInputs}
                        placeholder="Your Password"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="confirmpassword">
                        <i>
                          <AiOutlineLock />
                        </i>
                      </label>
                      <input
                        type="password"
                        name="confirmpassword"
                        id="confirmpassword"
                        autoCorrect="off"
                        value={user.confirmpassword}
                        onChange={handleInputs}
                        placeholder="Confirm Your Password"
                      />
                    </div>
                    <div className="form-group form-button">
                      <input
                        type="submit"
                        name="signup"
                        id="signup"
                        className="form-submit"
                        value="Register"
                        onClick={submitData}
                      />
                    </div>
                  </form>
                </div>
                <div className="col-lg-6 col-md-12 col-12 signup-img order-lg-2 order-1">
                  <img src={signup} alt="signup" />
                  <NavLink to="/login">I am already register</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
