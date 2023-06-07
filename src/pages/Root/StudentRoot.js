import React from "react";
import { Outlet } from "react-router-dom";
import StudentHeader from "../../components/Headers/StudentHeader";
import useLocationCheck from "../../hooks/useLocationCheck";

const StudentRoot = () => {
	const location_check = useLocationCheck(["/signin", "/signup"]);

	return (
		<div>
			{!location_check && <StudentHeader />}
			<Outlet />
		</div>
	);
};

export default StudentRoot;
