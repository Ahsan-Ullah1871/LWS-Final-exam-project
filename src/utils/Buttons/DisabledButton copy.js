import React from "react";
import ButtonLoadingAnimation from "../Loading/ButtonLoadingAnimation";

const DisabledButton = ({
	type,
	title,
	handleClickFunction,
	isLoading = false,
}) => {
	return (
		<button
			type={"button"}
			className={[
				"px-5 py-2 rounded-full bg-[#F8F8F8]  opacity-1 hover:opacity-90 text-[#8D98AF] text-base  shadow hover:shadow-md flex items-center justify-center transition duration-300 cursor-not-allowed",
			].join(" ")}
		>
			{title}
		</button>
	);
};

export default DisabledButton;
