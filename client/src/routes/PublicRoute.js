import React from "react";
import { Navigate, useLocation } from 'react-router-dom';
import { ACCESS_TOKEN } from "../constants";

const PublicRoute = ({ children }) => {

    const location = useLocation();
    const toPath = `/login${location.search}`

    return localStorage.getItem(ACCESS_TOKEN) ? children : <Navigate to={toPath} state={{ from: window.location }} />;
}
export default PublicRoute;