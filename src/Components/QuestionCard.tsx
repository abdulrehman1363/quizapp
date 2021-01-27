import React ,{useState} from 'react'
import { questionPropsType } from "./../Types/quiz_types";
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css'

export const QuestionCard : React.FC<questionPropsType> = ({question,option,callback}) => {

    let [selectedAns,setSelectedAns] = useState("")

    const handleSelection = (ev:any) => {
        setSelectedAns(ev.target.value)
    }

    const renderHTML = (rawHTML: string) => React.createElement("p", { dangerouslySetInnerHTML: { __html: rawHTML } });

    return (
        <Container>
            <Row>
                <Col md ={{ span: 6, offset: 3 }}>
                    <Card >
                        <Card.Header >Quiz</Card.Header>
                        <Card.Body >
                            {renderHTML(question)}
                                
                            <form onSubmit={(e:React.FormEvent<EventTarget>) => callback(e,selectedAns)}>
                                {
                                    option.map((opt:string,ind:number) => {
                                        return(
                                            <div key={ind}>
                                                <label>
                                                    <input type="radio" 
                                                    name="opt" 
                                                    value={opt} 
                                                    checked = {selectedAns === opt}
                                                    onChange={handleSelection}
                                                    required
                                                    />
                                                    {opt}
                                                </label>
                                            </div>
                                        )
                                    })
                                }
                                <Button type="submit"> Submit</Button>
                            </form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row> 
        </Container>
    )
}
