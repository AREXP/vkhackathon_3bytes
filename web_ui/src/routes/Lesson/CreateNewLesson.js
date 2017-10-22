import React from 'react'
import { Input, TextArea, Form, Button, Card } from 'semantic-ui-react'
import { compose, withState, withHandlers } from 'recompose'
import { withRouter } from 'react-router-dom'
import QuestionModal from './QuestionModal'
import Attachments from './Attachments'
import TextAttachments from './TextAttachments'

const enhance = compose(
  withRouter,
  withState('state', 'setState', ({ match: { params: { course } } }) => ({
    attachments: [],
    questions: [],
    course: {
      id: Number(course),
    },
  })),
  withHandlers({
    onInput: ({ setState }) => name => (e, { value }) =>
      setState(state => ({
        ...state,
        [name]: value,
      })),
    onAddQuestion: ({ setState }) => (payload) => {
      setState(state => ({
        ...state,
        questions: [...state.questions, payload],
      }))
    },
    onAddAttachment: ({ setState }) => (payload) => {
      console.log(payload)
      setState(state => ({
        ...state,
        attachments: [...state.attachments, payload],
      }))
    },
    onSubmit: ({ onSubmit, state, history, courseId }) => () => {
      onSubmit(state)
      history.push(`/${courseId}`)
    },
  }),
)

const QuestionPreview = ({ data = [] }) => data.map(({ title, answers }) => (
  <Card key={title}>
    <Card.Content>
      <Card.Header>{title}</Card.Header>
      <Card.Description>
        <Card.Meta>Ответы</Card.Meta>
        <ul>
          {answers.map(({ value }) => (
            <li key={value}>
              {value}
            </li>
          ))}
        </ul>
      </Card.Description>
      {`Правельные ответы - ${answers.filter(({ correct }) => correct).map(({ value }) => value).join(', ')}`}
    </Card.Content>
  </Card>
))

const CreateNewLesson = ({ onInput, onSubmit, onAddQuestion, onAddAttachment, state, lessons }) => (
  <Form onSubmit={onSubmit}>
    <Form.Field
      control={Input}
      label='Title'
      placeholder='Lesson title'
      onChange={onInput('title')}
    />
    <Form.Field
      control={TextArea}
      label='Description'
      placeholder='Lesson description``'
      onChange={onInput('description')}
    />
    <Attachments
      lessons={lessons}
      addAttachment={onAddAttachment}
    />
    <TextAttachments
      addAttachment={onAddAttachment}
    />
    {<QuestionPreview data={state.questions} />}
    <QuestionModal addQuestion={onAddQuestion} />
    <div style={{ padding: '8px 0' }} />
    <Form.Field control={Button}>Отправить</Form.Field>
  </Form>
)

export default enhance(CreateNewLesson)
