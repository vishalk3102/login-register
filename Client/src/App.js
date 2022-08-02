import React from "react";
import Register from "./Components/Register";
import Login from "./Components/Login";
import About from "./Components/About";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/about" element={<About />} />
      </Routes>
    </>
  );
};

export default App;
