import { useState } from "react";
import styled from "styled-components";
import Answer from "./Answer"
import {Question} from '../features/interfaces'

interface QuestionListProps {
    data: Question,
    type: string,
    onNext: () => void,
    show: boolean,
    onCorrectAnswer: () => void,
    currentStep: number
}

export default function QuestionList({data, type, onNext, show, onCorrectAnswer, currentStep}: QuestionListProps) {
    const [answerGiven, setAnswerGiven] = useState<null|string>(null);

    const handleClick= (id: number) => {
        setAnswerGiven(data.allAnswers[id]);
        data.allAnswers[id] === data.correctAnswer && onCorrectAnswer();
    }

    if (!show) return <></>
    else return (
        <Wrapper>
            {type==="flags" && <Flag>{data.flag}</Flag>}
            <QuestionText>{currentStep+1}. {data.text}</QuestionText>
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
    @media screen and (max-width: 500px) {
        font-size: 60px;
    }
`;


const QuestionText = styled.h2`
    font-size: 24px;
    font-weight: 700;
    line-height: 36px;
    margin-bottom: 32px;

    @media screen and (max-width: 500px) {
        font-size: 18px;
        margin-bottom: 24px;
        line-height: 24px;
    }
`;

const Answers = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
    @media screen and (max-width: 500px) {
        gap: 14px;
    }

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
    @media screen and (max-width: 500px) {
        font-size: 14px;
        padding: 15px 24px;
        margin-top: 14px;
    }

    &:hover, &:focus {
        border-color: var(--orange);
        background: var(--orange);
        color: var(--white);
        cursor: pointer;
    }
`;
