import { apiSlice } from "../features/api/apiSlice";
import { userLoggedOut } from "../features/auth/authSlice";

export const handleFormValueChange = ({ setFormState, key_name, value }) => {
	setFormState((prev) => ({ ...prev, [key_name]: value }));
};

export const handleAdminLogout = (dispatch) => {
	dispatch(userLoggedOut());
	localStorage.clear();
};

export const handleStudentLogout = (dispatch) => {
	dispatch(userLoggedOut());
	dispatch(apiSlice.util.invalidateTags(["courseVideos"]));
	localStorage.clear();
};
