// Fetched data with specific fields pulled
export type IncomingCountry = {
    name: {
        common: string
    },
    flag: string,
    capital: string
}

// Country object used to generate questions and answers
export interface Country {
    name: string,
    flag: string,
    capital: string
}

// Single question object with computed data from Country
export interface Question {
    text: string,
    flag: string
    allAnswers: string[],
    correctAnswer: string,
}

// Array of Question, under a single quiz type: 'flags' | 'capitals'
export interface QuestionCollection {
    type: string,
    data: Question[]
}