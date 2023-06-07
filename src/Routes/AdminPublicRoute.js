import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AdminPublicRoute = ({ children }) => {
	const isLoggedIn = useAuth();
	return isLoggedIn ? <Navigate to="/admin" /> : children;
};

export default AdminPublicRoute;
