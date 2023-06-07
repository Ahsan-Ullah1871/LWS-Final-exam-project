import React from "react";

const ErrorUI = ({ message = "There have some problem" }) => {
	return (
		<div className="flex flex-col gap-5 items-center justify-center  w-full">
			<div>
				<p className=" text-xl font-medium text-white  font-serif">
					{message}
				</p>
			</div>
			<img
				className="max-w-xl "
				src="/assets/image/Question.png"
				alt=""
			/>
		</div>
	);
};

export default ErrorUI;
