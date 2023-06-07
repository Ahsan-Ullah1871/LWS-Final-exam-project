import React, { useState } from "react";
import AssignmentsTable from "../../components/Assignments/AssignmentsTable";
import AddAssignmentForm from "../../components/forms/assigment/AddAssignmentForm";
import Alert from "../../utils/Alert/Alert";
import AlertBox from "../../utils/Alert/AlertBox";
import Modal from "../../utils/Modal/Modal";

const Assignments = () => {
	//Add Video modal state
	const [modalOpen, setModalOpen] = useState(false);

	// Alert state
	const [alertOpen, setAlertOpen] = useState(false);
	const [alertType, SetAlertType] = useState("success");
	const [message, setMessage] = useState(false);

	return (
		<>
			<section className="py-6 bg-primary">
				<div className="mx-auto max-w-full px-5 lg:px-20">
					<div className="px-3 py-20 bg-opacity-10">
						<div className="w-full flex">
							<button
								className="btn ml-auto"
								onClick={(e) => {
									e.stopPropagation();
									setModalOpen(
										true
									);
								}}
							>
								Add Assignment
							</button>
						</div>
						<AssignmentsTable />
					</div>
				</div>
			</section>

			{/*Add Assignment Modal UI */}
			<Modal
				id="add-video-modal"
				modalOpen={modalOpen}
				setModalOpen={setModalOpen}
				modalDialogWidth="max-h-[80VH]  max-w-[375px] md:max-w-lg min-w-max w-full "
			>
				<AddAssignmentForm
					setModal={setModalOpen}
					setAlertOpen={setAlertOpen}
					SetAlertType={SetAlertType}
					setMessage={setMessage}
				/>
			</Modal>

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

export default Assignments;
