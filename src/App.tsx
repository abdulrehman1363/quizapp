import React , {useState,useEffect}from 'react';
import { getQuizDetails } from "./services/quiz_service";
import { QuizType } from "./Types/quiz_types";
import { QuestionCard } from "./Components/QuestionCard";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {

  let [quiz,setQuiz] = useState<QuizType[]>([])
  let [currentStep,setCurrentStep] = useState(0)
  let [score,setScore] = useState(0)
  let [showResult, setShowResult] = useState(false)


  

  useEffect(()=>{
    async function fetchData() {
      
      if(quiz.length === 0){
        const questions = await getQuizDetails(5,'easy')

        setQuiz(questions)
      }
      
      
    }
    fetchData();
  },[quiz])

  const handleSubmit = (e:React.FormEvent<EventTarget>,ans:string) =>  {
    e.preventDefault();

    if(ans === quiz[currentStep].correct_answer){
      setScore(++score)
    }


    if(currentStep !== quiz.length - 1){
      setCurrentStep(++currentStep)
    }else {
      setShowResult(true);
    }
    

  }
  const handleRetake = (event:React.FormEvent<EventTarget>) => {
    event.preventDefault();
    setCurrentStep(0)
    setQuiz([])
    setShowResult(false)
    setScore(0)
}
  
  

  if(!quiz.length)
    return <Container>
        <h1>Loading ..... </h1>
    </Container>
  
  if(showResult){
    return(
      <Container>
        <Row>
          <Col md={{span:6 , offset:3}}>
            <Card>
              <Card.Header>
                Result
              </Card.Header>
              <Card.Body>
                <h1>Your Score is {score} out of {quiz.length}</h1>
                <Button onClick={handleRetake}> Retake Quiz</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }


  return (
    <div>
      
      <QuestionCard
        question = {quiz[currentStep].question} 
        option = {quiz[currentStep].option}
        callback = {handleSubmit}
      />
    </div>
  );
}

export default App;
