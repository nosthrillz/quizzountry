import { useEffect, useState } from 'react';
import styled from 'styled-components';
import QuestionList from './components/QuestionList';
import { computeQuestions } from './features/computeQuestions';
import { getNamesAndFlags } from './features/fetchData';
import Adventure from './images/undraw_adventure_4hum 1.svg';
import Results from './images/undraw_winners_ao2o 2.svg'

interface incomingData {
  name: string, flag: string, capital: string
}

export interface questions {
  text: string,
  correctAnswer: string,
  allAnswers: string[],
  flag: string
}
interface questionData {
  type:string,
  data: questions[]
}

function App() {
  const [questions, setQuestions] = useState<questionData | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [correctAnswers, setcorrectAnswers] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);


  const fetchData = async () => {
    const data = await getNamesAndFlags();
    setQuestions(computeQuestions(data));
  }


  useEffect(()=>{
    fetchData();
  }, [])

  useEffect(()=> {
    if (currentStep === 10) {
      setShowResults(true);
    }
  }, [currentStep])

  const handleReplay = () => {
    fetchData();
    setCurrentStep(0);
    setShowResults(false);
  }

  return (
    <Wrapper>
      <Main>
        <Title>Country quiz</Title>
        {!showResults &&
          <CardWrapper>
            <img src={Adventure} alt="country quiz logo" />
            {!!questions && questions.data.map((question, idx)=>
              <QuestionList
                type={questions.type}
                data={question}
                key={idx}
                show={currentStep === idx}
                onNext={()=>setCurrentStep(step=>step+1)}
                onCorrectAnswer={()=>{setcorrectAnswers(count=>count+1); console.log(correctAnswers)}}
              />
            )}
          </CardWrapper>
        }
        {showResults &&
          <ResultsReset>
            <img src={Results} alt="results" />
            <ResultsTitle>Results</ResultsTitle>
            <ResultsText>
              You got <strong>{correctAnswers}</strong> correct answers
            </ResultsText>
            <ResultsButton onClick={handleReplay}>
              Play again
            </ResultsButton>
          </ResultsReset>
        }
      </Main>
      <footer>
        built with ❤️ by <a href="https://github.com/nosthrillz" target="_blank" rel="noreferrer">NoSThrillZ</a> - devChallenges.io
      </footer>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20%;
  height: inherit;
`;

const Main = styled.main`
  flex-grow: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  isolation: isolate;
  width: clamp(300px, 100%, 600px);
`;

const Title = styled.h1`
  text-transform: uppercase;
  font-size: 36px;
  font-weight: 700;
  line-height: 54px;
  color: var(--white);
  z-index: 2;
  background: radial-gradient(rgba(0,0,0,.1),rgba(0,0,0,.03),rgba(0,0,0,0));
  width: fit-content;
`;

const CardWrapper = styled.div`
  background: var(--white);
  border-radius: 24px;
  padding: 32px;
  padding-top: 64px;
  position: relative;
  z-index: 1;
  min-height: fit-content;

  img {
    position: absolute;
    right: 0;
    top: -72px;
  }
`;

const ResultsReset = styled(CardWrapper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 550px;

  img {
    position: initial;
    width: 50%;
  }
`;

const ResultsTitle = styled.h2`
  font-size: 48px;
  font-weight: 700;
  line-height: 72px;
`;

const ResultsText = styled.p`
  font-size: 18px;
  font-weight: 400;
  line-height: 54px;

  strong {
    font-size: 36px;
    font-weight: 700;
    color: var(--green);
  }
`

const ResultsButton = styled.button`
  all: unset;
  width: fit-content;
  font-family: inherit;
  font-size: 18px;
  padding: 15px 36px;
  border-radius: 12px;
  border: 2px solid;

  &:hover, &:focus {
      border-color: var(--orange);
      background: var(--orange);
      color: var(--white);
      cursor: pointer;
  }
`;
