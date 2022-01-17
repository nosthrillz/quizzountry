import { useState } from "react";
import styled from "styled-components";
import Answer from "./Answer"
import {questions} from '../App'

// interface questions {
//     text: string,
//     correctAnswer: string,
//     allAnswers: string[],
//     flag: string
//   }

interface QuestionListProps {
    data: any,
    type: string,
    onNext: () => void,
    show: boolean,
    onCorrectAnswer: () => void,
}

export default function QuestionList({data, type, onNext, show, onCorrectAnswer}: QuestionListProps) {
    const [answerGiven, setAnswerGiven] = useState<null|string>(null);

    const handleClick= (id: number) => {
        setAnswerGiven(data.allAnswers[id]);
        data.allAnswers[id] === data.correctAnswer && onCorrectAnswer();
    }

    if (!show) return <></>
    else return (
        <Wrapper>
            {type==="flags" && <Flag>{data.flag}</Flag>}
            <Question>{data.text}</Question>
            <Answers>
            {data.allAnswers.map((answer:string, idx:number) =>(
                <Answer
                    key={idx}
                    letterIndex={['A','B','C','D'][idx]}
                    text={answer}
                    onClick={()=>handleClick(idx)}
                    disabled={!!answerGiven}
                    correctAnswer={data.correctAnswer}
                    chosenAnswer={answerGiven}
                />
            ))}
            </Answers>
            {!!answerGiven && <Next onClick={onNext}>Next</Next>}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const Flag = styled.p`
    margin-top: -60px;
    display: flex;
    font-size: 80px;
    text-shadow:
        1px 1px rgba(0, 0, 0, 0.1),
        1px 2px rgba(0, 0, 0, 0.1),
        3px 4px rgba(0, 0, 0, 0.1);
`;


const Question = styled.h2`
    font-size: 24px;
    font-weight: 700;
    line-height: 36px;
    margin-bottom: 32px;
`;

const Answers = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
`;

const Next = styled.button`
    all: unset;
    margin-left: auto;
    margin-top: 24px;
    width: fit-content;
    font-family: inherit;
    font-size: 18px;
    padding: 15px 36px;
    border-radius: 12px;
    color: var(--purple);
    border: 2px solid;

    &:hover, &:focus {
        border-color: var(--orange);
        background: var(--orange);
        color: var(--white);
        cursor: pointer;
    }
`;
