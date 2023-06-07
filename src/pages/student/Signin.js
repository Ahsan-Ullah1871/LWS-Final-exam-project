import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../../features/auth/authApi";
import Alert from "../../utils/Alert/Alert";
import AlertBox from "../../utils/Alert/AlertBox";
import { handleFormValueChange } from "../../utils/CommonFunctions";
import ButtonLoadingAnimation from "../../utils/Loading/ButtonLoadingAnimation";

const StudentSignin = () => {
	// login mutation hook
	const [login, { data, isLoading, isError, error, isSuccess }] =
		useLoginMutation();

	//Form state
	const [formState, setFormState] = useState({});

	// Alert state
	const [alertOpen, setAlertOpen] = useState(false);
	const [alertType, SetAlertType] = useState("success");
	const [message, setMessage] = useState(false);

	//Form submit function
	const onSubmit = (e) => {
		e.preventDefault();
		login({ data: formState, role: "student" });
	};

	//error and success handlaing
	useEffect(() => {
		if (isError) {
			setAlertOpen(true);
			SetAlertType("error");
			setMessage(error?.data || error?.message);
		} else if (isSuccess) {
			setAlertOpen(true);
			SetAlertType("success");
			setMessage("Logged in successfully");
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
							Sign in to Student Account
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
									className="login-input rounded-t-md"
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
									className="login-input rounded-b-md"
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
						</div>

						<div className="flex items-center justify-end">
							<div className="text-sm">
								<Link
									to="/signup"
									className="font-medium text-violet-600 hover:text-violet-500"
								>
									Create New
									Account
								</Link>
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
								disabled={isLoading}
							>
								Sign in
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

export default StudentSignin;
