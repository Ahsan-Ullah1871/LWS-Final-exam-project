import { Fragment, useEffect, useRef, useState } from "react";
import InputField from "../FormFileds/InputField";
import PrimaryButton from "../Buttons/PrimaryButton";
import SwitchButton from "../FormFileds/SwitchButton";
import SecondaryButton from "../Buttons/SeconDaryButton";
import TextArea from "../FormFileds/TextArea";
import Transition from "../Transition";

const Dropdown = ({
	values,
	setValues,
	dropdown_btn_title,
	dropdown_btn_style,
	dropdown_options,
	handle_dropdown_close,
	dropdown_close_btn_title,
	dropdown_add_btn_title,
	dropdown_add_btn_disable,
}) => {
	const [isOpen, setIsOpen] = useState(true);
	const dropdownContent = useRef(null);

	// close on click outside
	useEffect(() => {
		const clickHandler = ({ target }) => {
			if (!isOpen || dropdownContent.current.contains(target))
				return;
			setIsOpen(false);
		};
		document.addEventListener("click", clickHandler);
		return () => document.removeEventListener("click", clickHandler);
	});
	// close if the esc key is pressed
	useEffect(() => {
		const keyHandler = ({ keyCode }) => {
			if (!isOpen || keyCode !== 27) return;
			setIsOpen(false);
		};
		document.addEventListener("keydown", keyHandler);
		return () => document.removeEventListener("keydown", keyHandler);
	});

	return (
		<div className="relative w-full inline-block mt-6  mb-28">
			<div>
				<button
					type="button"
					className={
						dropdown_btn_style ??
						"w-full px-2 py-2 border border-green-700 border-dashed rounded-sm shadow-sm     text-green-700 font-medium"
					}
					onClick={(e) => {
						e.stopPropagation();
						setIsOpen(!isOpen);
					}}
				>
					{dropdown_btn_title ?? "Add new value"}
				</button>
			</div>
			{/* Use the `Transition` component. */}
			<Transition
				show={isOpen}
				tag="div"
				className={
					"absolute   ltr:right-0 rtl:left-0  mt-2 origin-top-right bg-white    rounded-md   shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none py-3 z-[60] flex flex-col gap-4 w-full"
				}
				enter="transition ease-out duration-200 transform"
				enterStart="opacity-0 -translate-y-2"
				enterEnd="opacity-100 translate-y-0"
				leave="transition ease-out duration-200"
				leaveStart="opacity-100"
				leaveEnd="opacity-0"
			>
				<div ref={dropdownContent}>
					<div
						as="div"
						className="w-full px-3 flex flex-col gap-4"
					>
						{dropdown_options?.map((option) => {
							if (option?.type == "input") {
								return (
									<TextArea
										setFormState={
											setValues
										}
										key_name={
											option?.key_name
										}
										title={
											option?.title
										}
										formState={
											values
										}
										type="text"
									/>
								);
							} else if (
								option?.type == "switch"
							) {
								return (
									<SwitchButton
										setFormState={
											setValues
										}
										key_name={
											option?.key_name
										}
										title={
											option?.title
										}
										formState={
											values
										}
									/>
								);
							}
						})}
					</div>
					<div
						as="div"
						className="w-full px-3 mt-4 flex items-center justify-end gap-4 "
						disabled={dropdown_add_btn_disable}
					>
						<SecondaryButton
							title={
								dropdown_close_btn_title
							}
							type="button"
							handleClickFunction={() =>
								setIsOpen(false)
							}
						/>
						<PrimaryButton
							title={dropdown_add_btn_title}
							handleClickFunction={() => {
								handle_dropdown_close();
								setIsOpen(false);
							}}
							isDisable={
								dropdown_add_btn_disable
							}
						/>
					</div>
				</div>
			</Transition>
		</div>
	);
};

export default Dropdown;
