import React from 'react'
import { Input, TextArea, Form, Button } from 'semantic-ui-react'
import { compose, withState, withHandlers } from 'recompose'
import { withRouter } from 'react-router-dom'

const enhance = compose(
  withRouter,
  withState('state', 'setState', {}),
  withHandlers({
    onInput: ({ setState }) => name => (e, { value }) =>
      setState(state => ({ ...state, [name]: value })),
    onSubmit: ({ onSubmit, state, history }) => () => {
      onSubmit(state)
      history.push('/')
    },
  }),
)

const CreateNewCourse = ({ onInput, onSubmit }) => (
  <Form onSubmit={onSubmit}>
    <Form.Field
      control={Input}
      label='Title'
      placeholder='Course name'
      onChange={onInput('title')}
    />
    <Form.Field
      control={TextArea}
      label='Description'
      placeholder='Course name'
      onChange={onInput('description')}
    />
    <Form.Field control={Button}>Submit</Form.Field>
  </Form>
)

export default enhance(CreateNewCourse)
