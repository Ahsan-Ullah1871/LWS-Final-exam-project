import React from "react";
import ButtonLoadingAnimation from "../Loading/ButtonLoadingAnimation";

const PrimaryButton = ({
	type,
	title,
	handleClickFunction,
	isLoading = false,
	isDisable = false,
}) => {
	const handleClick = (e) => {
		handleClickFunction && handleClickFunction();
	};

	return (
		<button
			type={type ?? "button"}
			onClick={handleClick}
			className={[
				"px-5 py-2 rounded-md bg-[#34b5fd]  opacity-1 hover:opacity-90 text-white text-base  shadow hover:shadow-md flex items-center justify-center transition duration-300 ",
				isLoading || isDisable
					? "cursor-not-allowed"
					: "cursor-pointer",
			].join(" ")}
			disabled={isLoading || isDisable}
		>
			{title}
			{isLoading && <ButtonLoadingAnimation />}
		</button>
	);
};

export default PrimaryButton;
