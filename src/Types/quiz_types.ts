export type QuestionType ={
    category : string,
    type : string,
    difficulty: string,
    question : string,
    correct_answer : string,
    incorrect_answers : string[]

}

export type QuizType = {
    question : string,
    answer : string,
    option : string[],
    correct_answer : string
}

export type questionPropsType = {
    question : string,
    option : string[],
    callback: (e:React.FormEvent<EventTarget>,ans:string) => void
}