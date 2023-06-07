import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRoleCheck from "../hooks/useRoleCheck";

const AdminPrivateRoute = ({ children }) => {
	const isLoggedIn = useAuth();
	const isAdminRoute = useRoleCheck("admin");
	return isLoggedIn ? (
		isAdminRoute ? (
			children
		) : (
			<Navigate to="/" />
		)
	) : (
		<Navigate to="/admin/signin" />
	);
};

export default AdminPrivateRoute;
