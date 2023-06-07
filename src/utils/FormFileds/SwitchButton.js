import { Switch } from "@headlessui/react";
import React from "react";

const SwitchButton = ({
	setFormState,
	key_name,
	title,
	formState = {},
	isRequired = false,
	options,
}) => {
	const handleValueChange = (value) => {
		setFormState((prev) => ({ ...prev, [key_name]: value }));
	};

	return (
		<div className=" flex items-center justify-start  gap-4  ">
			<Switch
				checked={formState?.[key_name]}
				onChange={(value) => handleValueChange(value)}
				className={`${
					formState?.[key_name]
						? "bg-[#34b5fd]"
						: "bg-[#8D98AF]"
				}
          relative inline-flex flex-shrink-0 h-[24px] w-[60px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
			>
				{formState?.[key_name] ? (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5 absolute left-2 top-0 bottom-0 my-auto text-bold text-white "
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
							clip-rule="evenodd"
						/>
					</svg>
				) : (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5 absolute right-2 top-0 bottom-0 my-auto text-bold text-white "
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
							clip-rule="evenodd"
						/>
					</svg>
				)}
				<span
					aria-hidden="true"
					className={`${
						formState?.[key_name]
							? "translate-x-9"
							: "translate-x-0"
					}
            pointer-events-none inline-block h-[20px] w-[20px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
				/>
			</Switch>
			<p className="text-sm font-medium text-[#838ea4] ">
				{title}
			</p>
		</div>
	);
};

export default SwitchButton;
