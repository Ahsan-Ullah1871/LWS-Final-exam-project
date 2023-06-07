import Transition from "../Transition";
import React, { useRef, useEffect } from "react";

function Modal({
	children,
	id,
	modalOpen,
	setModalOpen,
	close_function,
	modalDialogWidth,
}) {
	const modalContent = useRef(null);

	// close on click outside
	useEffect(() => {
		const clickHandler = ({ target }) => {
			if (!modalOpen || modalContent.current.contains(target))
				return;
			setModalOpen(false);
			close_function && close_function();
		};
		document.addEventListener("click", clickHandler);
		return () => document.removeEventListener("click", clickHandler);
	});

	// close if the esc key is pressed
	useEffect(() => {
		const keyHandler = ({ keyCode }) => {
			if (!modalOpen || keyCode !== 27) return;
			setModalOpen(false);
			close_function && close_function();
		};
		document.addEventListener("keydown", keyHandler);
		return () => document.removeEventListener("keydown", keyHandler);
	});

	return (
		<>
			{/* Modal backdrop */}
			<Transition
				className="fixed inset-0 bg-gray-900 bg-opacity-30  z-50 transition-opacity"
				show={modalOpen}
				enter="transition ease-out duration-200"
				enterStart="opacity-0"
				enterEnd="opacity-100"
				leave="transition ease-out duration-100"
				leaveStart="opacity-100"
				leaveEnd="opacity-0"
				aria-hidden="true"
			/>
			{/*Modal dialog  */}
			<Transition
				id={id}
				className={[
					`fixed  inset-0  z-[50] overflow-hidden flex items-center    transform  justify-center`,
				].join(" ")}
				role="dialog"
				aria-modal="true"
				show={modalOpen}
				enter="transition ease-in-out duration-200"
				enterStart="opacity-0 translate-y-4"
				enterEnd="opacity-100 translate-y-0"
				leave="transition ease-in-out duration-200"
				leaveStart="opacity-100 translate-y-0"
				leaveEnd="opacity-0 translate-y-4"
			>
				<div
					ref={modalContent}
					className={[
						"bg-white rounded shadow-lg overflow-auto ",
						modalDialogWidth ??
							"max-h-full  max-w-lg min-w-max w-full ",
					].join(" ")}
				>
					{children}
				</div>
			</Transition>
		</>
	);
}

export default Modal;
