import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { AllRoutes } from "./Routes/MainRoutes";
import useAuthCheck from "./hooks/useAuthCheck";

function App() {
	const authChecked = useAuthCheck();
	return !authChecked ? (
		<div className="flex flex-col justify-center items-center gap-10 py-20">
			<p className="text-3xl font-bold text-white ">
				Auth checking...
			</p>
			<img
				className="max-w-lg  max-h-80"
				src="/assets/image/learning-fom-course.png"
				alt=""
			/>
		</div>
	) : (
		<RouterProvider router={AllRoutes} />
	);
}

export default App;

