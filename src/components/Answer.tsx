import styled from 'styled-components'

interface AnswerProps {
    letterIndex: string,
    text: string,
    onClick: (e:any) => boolean | void;
    disabled: boolean,
    correctAnswer: string,
    chosenAnswer: null|string,
}

export default function Answer({letterIndex, text, onClick, disabled, correctAnswer, chosenAnswer}:AnswerProps) {

    const handleClick = (e:any) => {
        return !disabled && onClick(e);
    }

    return (
        <AnswerButton
            onClick={(e)=>handleClick(e)}
            disabled={disabled}
            answerStatus={
                !chosenAnswer
                    ? null
                    : (chosenAnswer === correctAnswer
                        ? (text===chosenAnswer
                            ? true
                            : null)
                        : (text===chosenAnswer
                            ? false
                            : (text===correctAnswer ? true : null)))}>
            <span>{letterIndex}</span>{text}
        </AnswerButton>
    )
}

const AnswerButton = styled.button<{answerStatus: null | boolean}>`
    display: flex;
    color: var(--purple);
    padding: 15px;
    padding-left: 80px;
    border: 2px solid;
    border-radius: 12px;
    position: relative;
    font-weight: 500;
    font-size: 18px;
    width: 100%;
    @media screen and (max-width: 500px) {
        font-size: 14px;
    }

    span {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 15px;
    }

    &:hover, &:focus {
        border-color: ${props=>!props.disabled && 'var(--orange)'};
        background: ${props=>!props.disabled && 'var(--orange)'};
        color: ${props=>!props.disabled && 'var(--white)'};
        cursor: ${props=>!props.disabled && 'pointer'};
    }

    background: ${props=>props.answerStatus === null ? 'transparent' : !!props.answerStatus ? 'var(--green)' : 'var(--red)'};
    color: ${props=>props.answerStatus === null ? 'var(--purple)' : 'var(--white)'};
`;
