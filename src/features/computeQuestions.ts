import {Country} from './interfaces'

export const computeQuestions = (data: Country[], NUMBER_OF_QUESTIONS: number) => {
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

/* *************
HELPER FUNCTIONS
************* */

// randomly pick an item from given array {data}
const pickRandom = (data: any[]) => {
    return data[Math.floor(Math.random() * data.length)];
}

// randomly pick {count} number of items from {data} and store their {subject} value
const select = (data: any[], count: number, subject: string) => {
    let selection=[];
    for (let i=0;i<count;i++) {
        !!subject ? selection.push(pickRandom(data)[subject])
        : selection.push(pickRandom(data));
    }
    return selection;
}

// check for duplicates in array
const hasDuplicates = (arr: any[]) => {
    return arr.filter((item:string, index:number) => arr.indexOf(item) !== index).length > 0;
}

// shuffle an array
// based on https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array: any[]) {
    let tempArr = array;
    for (let i = tempArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tempArr[i], tempArr[j]] = [tempArr[j], tempArr[i]];
    }
    return tempArr;
}