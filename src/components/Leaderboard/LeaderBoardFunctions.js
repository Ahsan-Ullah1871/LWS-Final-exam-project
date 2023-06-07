export const leaderBoardRank = ({ assignmentMarks, quizMarks }) => {
	const rankList = {};

	assignmentMarks?.forEach((item) => {
		const { student_id, mark, student_name } = item;

		if (!rankList[student_id]) {
			rankList[student_id] = {
				student_id,
				student_name,
				assignments_marks: Number(mark),
				quiz_marks: 0,
			};
		} else {
			rankList[student_id].assignments_marks += Number(mark);
		}
	});

	quizMarks?.forEach((item) => {
		const { student_id, mark, student_name } = item;

		if (!rankList[student_id]) {
			rankList[student_id] = {
				student_id,
				student_name,
				assignments_marks: 0,
				quiz_marks: Number(mark),
			};
		} else {
			rankList[student_id].quiz_marks += mark;
		}
	});

	const rankArr = Object.values(rankList)
		.map((item) => ({
			...item,
			total_marks: item.assignments_marks + item.quiz_marks,
		}))
		.sort((a, b) => b.total_marks - a.total_marks);

	let rank = 1;
	let prevTotalMarks = -1;
	rankArr.forEach((item, index) => {
		if (item.total_marks !== prevTotalMarks) {
			// If total marks are not the same as previous student's total marks, assign new rank
			item.rank = rank;
			rank++;
		} else {
			// If total marks are the same as previous student's total marks, assign the same rank
			item.rank = rank - 1;
		}
		prevTotalMarks = item.total_marks;
	});

	return rankArr;
};
