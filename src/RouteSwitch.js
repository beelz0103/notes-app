import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Test from "./Test";

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
