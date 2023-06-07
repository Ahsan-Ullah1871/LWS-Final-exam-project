import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../features/auth/authSlice";

export default function useAuthCheck() {
	const dispatch = useDispatch();
	const [authChecked, setAuthChecked] = useState(false);
	useEffect(() => {
		const localAuth = localStorage.getItem("userData");

		if (localAuth) {
			const userData = JSON.parse(localAuth);
			if (
				userData.isLoggedIn &&
				userData.user &&
				userData.role
			) {
				dispatch(
					userLoggedIn({
						isLoggedIn: userData.isLoggedIn,
						user: userData.user,
						role: userData.role,
					})
				);
			}
		}
		setAuthChecked(true);
	}, []);
	return authChecked;
}
