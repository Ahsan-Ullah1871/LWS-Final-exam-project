///totalCorrect answers

export const totalCorrectAnswers = (quiz_answers) => {
	let sum = quiz_answers.filter(
		(ans) =>
			ans.selected_answers?.length > 0 &&
			ans.selected_answers?.every(
				(selected_ans) => selected_ans?.isCorrect
			) &&
			JSON.stringify(ans.correct_options_ids.sort()) ===
				JSON.stringify(
					ans.selected_answers
						?.filter((option) => option.isCorrect)
						?.map((option) => option.id)
						.sort()
				)
	)?.length;

	return sum;
};

// handleAnswerSelect
export const handleQuizAnswerSelect = ({
	quiz,
	option,
	quiz_answers,
	setQuizAnswers,
}) => {
	// Searching is current  quiz is available in answers list ..
	let isAnswerAvailable =
		quiz_answers?.length > 0
			? quiz_answers?.filter((ans) => ans.id == quiz.id)
					?.length > 0
				? true
				: undefined
			: undefined;

	if (isAnswerAvailable) {
		let prevAnswer = quiz_answers?.filter(
			(ans) => ans.id == quiz.id
		)[0];

		//Searching is current answer availble in quiz answer list
		let isSelectedAnswerAvailable =
			prevAnswer?.selected_answers?.length > 0
				? prevAnswer?.selected_answers?.filter(
						(ans) => ans.id == option.id
				  )?.length > 0
					? true
					: undefined
				: undefined;

		//Set value in state
		setQuizAnswers((prev) => [
			{
				id: quiz.id,
				correct_options_ids: quiz?.options
					?.filter((option) => option.isCorrect)
					?.map((option) => option.id),
				selected_answers: isSelectedAnswerAvailable
					? prevAnswer?.selected_answers?.filter(
							(ans) => ans.id !== option.id
					  )
					: [
							{
								id: option.id,
								isCorrect: option.isCorrect,
							},
							...prevAnswer?.selected_answers,
					  ],
			},
			...prev.filter((ans) => ans.id !== quiz.id),
		]);
	} else {
		setQuizAnswers((prev) => [
			{
				id: quiz.id,
				selected_answers: [
					{
						id: option.id,
						isCorrect: option.isCorrect,
					},
				],
				correct_options_ids: quiz?.options
					?.filter((option) => option.isCorrect)
					?.map((option) => option.id),
			},
			...prev,
		]);
	}
};
