import React from "react";

const UILoading = ({ message = "Loading.." }) => {
	return (
		<div className="flex flex-col gap-4 items-center justify-center  w-full">
			<div>
				<p className=" text-xl font-medium text-white  font-serif">
					{message}
				</p>
			</div>
			<img
				className="max-w-xl "
				src="/assets/image/learining.png"
				alt=""
			/>
		</div>
	);
};

export default UILoading;
