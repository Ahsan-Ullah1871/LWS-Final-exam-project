import React from "react";
import ButtonLoadingAnimation from "../Loading/ButtonLoadingAnimation";

const SecondaryButton = ({
	type,
	title,
	handleClickFunction,
	isLoading = false,
}) => {
	return (
		<button
			type={type ?? "button"}
			onClick={handleClickFunction ?? ""}
			className={[
				"px-5 py-2 rounded-md bg-[#F8F8F8]  opacity-1 hover:opacity-90 text-[#8D98AF] text-base  shadow hover:shadow-md flex items-center justify-center transition duration-300",
				isLoading ? "cursor-not-allowed" : "cursor-pointer",
			].join(" ")}
			disabled={isLoading}
		>
			{title}
			{isLoading && <ButtonLoadingAnimation />}
		</button>
	);
};

export default SecondaryButton;
