import { createBrowserRouter } from "react-router-dom";
import StudentRoot from "../pages/Root/StudentRoot";
import CoursePlayer from "../pages/student/CoursePlayer";
import Leaderboard from "../pages/student/Leaderboard";
import AdminSignin from "../pages/admin/Signin";
import StudentSignup from "../pages/student/Signup";
import AdminRoot from "../pages/Root/AdminRoot";
import StudentSignin from "../pages/student/Signin";
import Dashboard from "../pages/admin/Dashboard";
import Videos from "../pages/admin/Videos";
import Assignments from "../pages/admin/Assignments";
import AssignmentMarks from "../pages/admin/AssignmentMarks";
import Quizzes from "../pages/admin/Quizzes";
import AdminPrivateRoute from "./AdminPrivateRoute";
import AdminPublicRoute from "./AdminPublicRoute";
import PublicRoute from "./StudentPublicRoute";
import PrivateRoute from "./StudentPrivateRoute";
import Quiz from "../pages/student/Quiz";
import ErrorUI from "../utils/Error/ErrorUi";

export const AllRoutes = createBrowserRouter([
	{
		path: "/",
		element: <StudentRoot />,
		children: [
			{
				index: true,
				element: (
					<PrivateRoute>
						<CoursePlayer />
					</PrivateRoute>
				),
			},
			{
				path: "leaderboard",
				element: (
					<PrivateRoute>
						<Leaderboard />
					</PrivateRoute>
				),
			},
			{
				path: "quiz/:videoID",
				element: (
					<PrivateRoute>
						<Quiz />
					</PrivateRoute>
				),
			},
			{
				path: "signin",
				element: (
					<PublicRoute>
						<StudentSignin />
					</PublicRoute>
				),
			},
			{
				path: "signup",
				element: (
					<PublicRoute>
						{" "}
						<StudentSignup />
					</PublicRoute>
				),
			},
		],
		errorElement: (
			<div className="mt-20">
				<ErrorUI message=" Sorry , There have not any page with this url " />
			</div>
		),
	},
	{
		path: "/admin",
		element: <AdminRoot />,
		children: [
			{
				index: true,
				element: (
					<AdminPrivateRoute>
						<Dashboard />
					</AdminPrivateRoute>
				),
			},
			{
				path: "videos",
				element: (
					<AdminPrivateRoute>
						<Videos />
					</AdminPrivateRoute>
				),
			},
			{
				path: "assignments",
				element: (
					<AdminPrivateRoute>
						<Assignments />
					</AdminPrivateRoute>
				),
			},
			{
				path: "assignments-marks",
				element: (
					<AdminPrivateRoute>
						<AssignmentMarks />
					</AdminPrivateRoute>
				),
			},
			{
				path: "quizzes",
				element: (
					<AdminPrivateRoute>
						<Quizzes />
					</AdminPrivateRoute>
				),
			},
			{
				path: "signin",
				element: (
					<AdminPublicRoute>
						<AdminSignin />
					</AdminPublicRoute>
				),
			},
		],
		errorElement: (
			<div className="mt-20">
				<ErrorUI message=" Sorry , There have not any page with this url " />
			</div>
		),
	},
]);
