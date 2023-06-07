import React from "react";

const TextArea = ({
	setFormState,
	key_name,
	title,
	formState,
	isRequired = false,
}) => {
	const handleValueChange = ({ value }) => {
		setFormState((prev) => ({ ...prev, [key_name]: value }));
	};
	return (
		<div className="flex flex-col gap-3">
			<p className="text-sm font-medium text-[#838ea4]">
				{title}
			</p>
			<textarea
				type="text"
				cols={5}
				value={formState?.[key_name]}
				className=" w-full font-normal text-sm
                        px-2 py-3 border border-indigo-100 rounded-md   shadow-md outline-none
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
				onChange={(e) =>
					handleValueChange({
						value: e.target.value,
					})
				}
				required={isRequired}
			/>
		</div>
	);
};

export default TextArea;
