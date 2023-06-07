import React from "react";
import { useSelector } from "react-redux";

export default function useAuth() {
	const auth = useSelector((state) => state.auth);
	if (auth?.isLoggedIn && auth?.user && auth?.role) {
		return true;
	} else {
		return false;
	}
}
