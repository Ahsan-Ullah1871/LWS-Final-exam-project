import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRoleCheck from "../hooks/useRoleCheck";

const PrivateRoute = ({ children }) => {
	const isLoggedIn = useAuth();
	const isStudentRoute = useRoleCheck("student");
	return isLoggedIn ? (
		isStudentRoute ? (
			children
		) : (
			<Navigate to="/admin" />
		)
	) : (
		<Navigate to="/signin" />
	);
};

export default PrivateRoute;
