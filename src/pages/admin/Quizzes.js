import React, { useState } from "react";
import AddQuizForm from "../../components/forms/quiz/AddQuizForm";
import QuizzesTable from "../../components/Quizzes/QuizzesTable";
import Alert from "../../utils/Alert/Alert";
import AlertBox from "../../utils/Alert/AlertBox";
import Modal from "../../utils/Modal/Modal";

const Quizzes = () => {
	//Add Video modal state
	const [modalOpen, setModalOpen] = useState(false);

	// Alert state
	const [alertOpen, setAlertOpen] = useState(false);
	const [alertType, SetAlertType] = useState("success");
	const [message, setMessage] = useState(false);
	return (
		<>
			{" "}
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
								Add Quiz
							</button>
						</div>
						<div className="overflow-x-auto mt-4">
							<QuizzesTable />
						</div>
					</div>
				</div>
			</section>
			{/*Add quiz Modal UI */}
			<Modal
				id="add-quiz-modal"
				modalOpen={modalOpen}
				setModalOpen={setModalOpen}
				modalDialogWidth="max-h-[80VH] min  max-w-[375px] md:max-w-lg min-w-max w-full "
			>
				<AddQuizForm
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

export default Quizzes;
