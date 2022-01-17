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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const NUMBER_OF_QUESTIONS = 1;


  const fetchData = async () => {
    const data = await getNamesAndFlags();
    setQuestions(computeQuestions(data, NUMBER_OF_QUESTIONS));
  }


  useEffect(()=>{
    fetchData();
  }, [])

  useEffect(()=> {
    if (currentStep === NUMBER_OF_QUESTIONS) {
      setShowResults(true);
    }
  }, [currentStep])

  const handleReplay = () => {
    setIsLoading(true);

    fetchData();
    setShowResults(false);
    setCurrentStep(0);
    setcorrectAnswers(0);

    setIsLoading(false);
  }

  if (isLoading) return <h1>Loading...</h1>

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
                onCorrectAnswer={()=>setcorrectAnswers(count=>count+1)}
                currentStep={currentStep}
              />
            )}
          </CardWrapper>
        }
        {showResults &&
          <ResultsReset>
            <img src={Results} alt="results" />
            <ResultsTitle>Results</ResultsTitle>
            <ResultsText number={correctAnswers}>
              You got <strong>{correctAnswers}</strong> correct answers!
            </ResultsText>
            <ResultsButton onClick={handleReplay}>
              {correctAnswers < 5 ? 'Try again' : 'Play again'}
            </ResultsButton>
          </ResultsReset>
        }
      </Main>
      <Footer>
        built with ❤️ by <a href="https://github.com/nosthrillz" target="_blank" rel="noreferrer">NoSThrillZ</a> - devChallenges.io
      </Footer>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-top: 15vh;
  height: inherit;

  @media screen and (max-width: 500px) {
   padding-top: 0;
   height: revert;
  }
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

  @media screen and (max-width: 500px) {
    font-size: 24px;
  }
`;

const CardWrapper = styled.div`
  background: var(--white);
  border-radius: 24px;
  padding: 32px;
  padding-top: 64px;
  position: relative;
  z-index: 1;
  min-height: fit-content;

  @media screen and (max-width: 500px) {
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 24px;
  }

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
  @media screen and (max-width: 500px) {
    font-size: 36px;
  }
`;

const ResultsText = styled.p<{number: number}>`
  font-size: 18px;
  font-weight: 400;
  line-height: 54px;
  @media screen and (max-width: 500px) {
    font-size: 14px;
  }

  strong {
    font-size: 36px;
    font-weight: 700;
    color: ${props=>props.number < 5 ? 'var(--red)' : 'var(--green)'};
    @media screen and (max-width: 500px) {
      font-size: 24px;
    }
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
  @media screen and (max-width: 500px) {
    font-size: 14px;
  }

  &:hover, &:focus {
      border-color: var(--orange);
      background: var(--orange);
      color: var(--white);
      cursor: pointer;
  }
`;

const Footer = styled.footer`
  color: var(--white);
  font-family: 'Montserrat';
  font-weight: 500;
  font-size: 14px;
  text-align: center;
  padding: 24px;

  @media screen and (max-width: 500px) {
    padding: 12px;
    font-size: 10px;
  }

  a {
    color: inherit;
    font-weight: 700;
  }
`;
