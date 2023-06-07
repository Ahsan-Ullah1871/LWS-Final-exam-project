import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminHeader from "../../components/Headers/AdminHeader";
import useLocationCheck from "../../hooks/useLocationCheck";

const AdminRoot = () => {
	const location_check = useLocationCheck(["/admin/signin"]);

	return (
		<div>
			{!location_check && <AdminHeader />}
			<Outlet />
		</div>
	);
};

export default AdminRoot;
