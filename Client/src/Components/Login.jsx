import React, { useState } from "react";
import "../Components/Register.css";
import { AiOutlineLock } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import login from "../Assets/login.jpg";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await res.json();

    if (data.status === 422 || !data) {
      window.alert("Invalid credentials");
      console.log("Invalid credentials");
    } else {
      window.alert("Login Successfull ");
      console.log("Successfull logged in ");

      navigate("/about");
    }
  };

  return (
    <>
      <section className="signup-section">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-12 signup-form">
              <div className="row">
                <div className="col-lg-6 signup-content order-lg-2 order-2">
                  <h2>Sign in</h2>
                  <form method="POST" className="register-form">
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your Email"
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Your Password"
                      />
                    </div>

                    <div className="form-group form-button">
                      <input
                        type="submit"
                        name="login"
                        id="login"
                        className="form-submit"
                        value="Log in"
                        onClick={loginUser}
                      />
                    </div>
                  </form>
                </div>
                <div className="col-lg-6 signup-img order-lg-1 order-1">
                  <img src={login} alt="signin" />
                  <NavLink to="/register">Create an Account</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
