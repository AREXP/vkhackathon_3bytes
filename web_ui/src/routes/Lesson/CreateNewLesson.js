import React from 'react'
import { Input, TextArea, Form, Button } from 'semantic-ui-react'
import { compose, withState, withHandlers } from 'recompose'
import { withRouter } from 'react-router-dom'

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
    onSubmit: ({ onSubmit, state, history, courseId }) => () => {
      onSubmit(state)
      history.push(`/${courseId}`)
    },
  }),
)

// {
//   "attachments": [
//     {
//       "annotation": "string",
//       "id": 0,
//       "media": 0,
//       "owner": 0,
//       "type": "string"
//     }
//   ],
//   "createdAt": "2017-10-21T04:42:53.175Z",
//   "description": "string",
//   "id": 0,
//   "last": true,
//   "position": 0,
//   "questions": [
//     {
//       "answers": [
//         {
//           "correct": true,
//           "id": 0,
//           "value": "string"
//         }
//       ],
//       "id": 0,
//       "title": "string",
//       "type": "string"
//     }
//   ],
//   "title": "string"
// }

const CreateNewLesson = ({ onInput, onSubmit }) => (
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
    <Form.Field control={Button}>Submit</Form.Field>
  </Form>
)

export default enhance(CreateNewLesson)
