import Transition from "../Transition";
import React, { useRef, useEffect } from "react";

function AlertBox({ children, id, alertOpen, setAlertOpen, close_function }) {
	const alertContent = useRef(null);

	// close on click outside
	useEffect(() => {
		const clickHandler = ({ target }) => {
			if (!alertOpen || alertContent.current.contains(target))
				return;
			setAlertOpen(false);
			close_function && close_function();
		};
		document.addEventListener("click", clickHandler);
		return () => document.removeEventListener("click", clickHandler);
	});

	// close if the esc key is pressed
	useEffect(() => {
		const keyHandler = ({ keyCode }) => {
			if (!alertOpen || keyCode !== 27) return;
			setAlertOpen(false);
			close_function && close_function();
		};
		document.addEventListener("keydown", keyHandler);
		return () => document.removeEventListener("keydown", keyHandler);
	});

	useEffect(() => {
		if (alertOpen) {
			const timer = setTimeout(() => {
				setAlertOpen(false);
				close_function && close_function();
			}, 2000);
			return () => clearTimeout(timer);
		}
	}, [alertOpen, close_function, setAlertOpen]);

	return (
		<Transition
			id={id}
			className={[
				`fixed  bottom-20 right-5   z-[60] overflow-hidden flex items-center    transform  justify-end`,
			].join(" ")}
			role="dialog"
			aria-modal="true"
			show={alertOpen}
			enter="transition ease-in-out duration-200"
			enterStart="opacity-0 translate-y-4"
			enterEnd="opacity-100 translate-y-0"
			leave="transition ease-in-out duration-200"
			leaveStart="opacity-100 translate-y-0"
			leaveEnd="opacity-0 translate-y-4"
		>
			<div
				ref={alertContent}
				className={[
					"bg-white rounded shadow-lg overflow-auto   max-h-full  max-w-lg min-w-max w-full ",
				].join(" ")}
			>
				{children}
			</div>
		</Transition>
	);
}

export default AlertBox;
