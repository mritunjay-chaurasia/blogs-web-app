import React from "react";
import { ACCESS_TOKEN } from "../constants";
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const toPath = `/login${location.search}`

    return localStorage.getItem(ACCESS_TOKEN) ? children : <Navigate to={toPath} state={{ from: window.location }} />;
}
export default PrivateRoute;