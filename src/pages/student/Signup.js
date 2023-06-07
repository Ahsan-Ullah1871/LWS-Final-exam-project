import React, { useState, useEffect } from "react";
import { useRegisterMutation } from "../../features/auth/authApi";
import { handleFormValueChange } from "../../utils/CommonFunctions";
import ButtonLoadingAnimation from "../../utils/Loading/ButtonLoadingAnimation";
import AlertBox from "../../utils/Alert/AlertBox";
import Alert from "../../utils/Alert/Alert";

const StudentSignup = () => {
	// signup mutation hook
	const [register, { data, isLoading, isError, error, isSuccess }] =
		useRegisterMutation();

	//Form state
	const [formState, setFormState] = useState({});

	// Alert state
	const [alertOpen, setAlertOpen] = useState(false);
	const [alertType, SetAlertType] = useState("success");
	const [message, setMessage] = useState(false);

	//Form submit function
	const onSubmit = (e) => {
		e.preventDefault();
		if (formState?.password !== formState?.confirm_password) {
			setAlertOpen(true);
			SetAlertType("error");
			setMessage("Password does'nt match");
			return false;
		} else {
			const from_values = formState;
			delete from_values.confirm_password;
			register({ ...from_values, role: "student" });
		}
	};

	//error and success handlaing
	useEffect(() => {
		if (isError) {
			setAlertOpen(true);
			SetAlertType("error");
			setMessage(error.data);
		} else if (isSuccess) {
			setAlertOpen(true);
			SetAlertType("success");
			setMessage("Register successfully");
		}
	}, [error?.data, isError, isSuccess]);

	return (
		<>
			<section className="py-6 bg-primary h-screen grid place-items-center">
				<div className="mx-auto max-w-md px-5 lg:px-0">
					<div>
						<img
							className="h-12 mx-auto"
							src="/assets/image/learningportal.svg"
						/>
						<h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
							Create Your New Account
						</h2>
					</div>
					<form
						className="mt-8 space-y-6"
						onSubmit={onSubmit}
					>
						<input
							type="hidden"
							name="remember"
							value="true"
						/>
						<div className="rounded-md shadow-sm -space-y-px">
							<div>
								<label
									for="name"
									className="sr-only"
								>
									Name
								</label>
								<input
									id="name"
									name="name"
									type="name"
									autocomplete="name"
									required
									className="login-input rounded-t-md"
									placeholder="Student Name"
									onChange={(e) =>
										handleFormValueChange(
											{
												setFormState:
													setFormState,
												key_name: "name",
												value: e
													.target
													.value,
											}
										)
									}
								/>
							</div>
							<div>
								<label
									for="email-address"
									className="sr-only"
								>
									Email address
								</label>
								<input
									id="email-address"
									name="email"
									type="email"
									autocomplete="email"
									required
									className="login-input "
									placeholder="Email address"
									onChange={(e) =>
										handleFormValueChange(
											{
												setFormState:
													setFormState,
												key_name: "email",
												value: e
													.target
													.value,
											}
										)
									}
								/>
							</div>
							<div>
								<label
									for="password"
									className="sr-only"
								>
									Password
								</label>
								<input
									id="password"
									name="password"
									type="password"
									autocomplete="current-password"
									required
									className="login-input"
									placeholder="Password"
									onChange={(e) =>
										handleFormValueChange(
											{
												setFormState:
													setFormState,
												key_name: "password",
												value: e
													.target
													.value,
											}
										)
									}
								/>
							</div>
							<div>
								<label
									for="confirm-password"
									className="sr-only"
								>
									Confirm Password
								</label>
								<input
									id="confirm-password"
									name="confirm-password"
									type="password"
									autocomplete="confirm-password"
									required
									className="login-input rounded-b-md"
									placeholder="Confirm Password"
									onChange={(e) =>
										handleFormValueChange(
											{
												setFormState:
													setFormState,
												key_name: "confirm_password",
												value: e
													.target
													.value,
											}
										)
									}
								/>
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
								disabled={isLoading}
							>
								Create Account
								{isLoading && (
									<ButtonLoadingAnimation />
								)}
							</button>
						</div>
					</form>
				</div>
			</section>

			{/*Alert UI */}
			<AlertBox
				id={`alert`}
				alertOpen={alertOpen}
				setAlertOpen={setAlertOpen}
				close_function={() => {
					SetAlertType("");
					setAlertOpen(false);
					setMessage("");
				}}
			>
				<Alert setAlertOpen={setAlertOpen} type={alertType}>
					{message}
				</Alert>
			</AlertBox>
		</>
	);
};

export default StudentSignup;
