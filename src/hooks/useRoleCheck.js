import React from "react";
import { useSelector } from "react-redux";

export default function useRoleCheck(role) {
	const auth = useSelector((state) => state.auth);
	if (auth?.role == role) {
		return true;
	} else {
		return false;
	}
}
