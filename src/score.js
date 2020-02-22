const scoreShow = data=>{
	const correct = data.correctType;
	const incorrect = data.incorrectType;
	const totalType = correct + incorrect;
	const correctRate = Math.round((correct / totalType) * 10000) / 100;
	const score = Math.round(correct**2 / totalType * 10000) / 100;
	console.log(`Correct Type: ${correct}\nIncorrect Type: ${incorrect}\nTotal: ${totalType}\nCorrect Rate: ${correctRate}\nScore: ${score}`)
};

export {scoreShow};