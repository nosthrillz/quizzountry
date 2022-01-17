export const computeQuestions = (data: [{name:string, flag: string, capital: string}], NUMBER_OF_QUESTIONS: number) => {
    const options = ['capitals','flags'];
    const selectedOption = pickRandom(options);

    let selectedQuestions = [];
    do {
        selectedQuestions = select(data,NUMBER_OF_QUESTIONS,'')
    } while
        (selectedQuestions.some((item)=>!item.flag) || hasDuplicates(selectedQuestions))

    return {
        type: selectedOption,
        data: selectedQuestions.map((question) => {
            const text = (selectedOption === 'capitals') ? `Which is the capital of ${question.name}?` : 'Which country does this flag belong to?';

            let otherAnswers = [];
            if (selectedOption==="capitals") do {otherAnswers = select(data, 3, 'capital')} while (otherAnswers.includes(question.capitals) || hasDuplicates(otherAnswers))
            else do {otherAnswers = select(data, 3, 'name')} while (otherAnswers.includes(question.name) || hasDuplicates(otherAnswers))

            const output = {
                text,
                correctAnswer: selectedOption==="capitals" ? question.capital : question.name,
                allAnswers: shuffleArray([...otherAnswers, selectedOption==="capitals" ? question.capital : question.name]),
                flag: question.flag
            }
            return output;
        })
}
}

const pickRandom = (data: any) => {
    return data[Math.floor(Math.random() * data.length)];
}

const select = (data: any, count: number, subject: string) => {
    let selection=[];
    for (let i=0;i<count;i++) {
        !!subject ? selection.push(pickRandom(data)[subject])
        : selection.push(pickRandom(data));
    }
    return selection;
}

const hasDuplicates = (arr: any) => {
    return arr.filter((item:any, index:number) => arr.indexOf(item) !== index).length > 0;
}

// array shuffle from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array: any) {
    let newArr = array;
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
}