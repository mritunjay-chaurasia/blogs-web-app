import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CustomerSignUp from "./CustomerSignup";
import TechnicianSignUp from "./TechnicianSignUp";

const Registration = () => {
  const location = useLocation();
  const dataFromLogdin = location.state?.data;

  return (
    <>
      {dataFromLogdin === "technician" ? (
        <TechnicianSignUp />
      ) : (
        <CustomerSignUp />
      )}
    </>
  );
};
export default Registration;
