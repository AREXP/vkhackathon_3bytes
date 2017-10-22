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
      label='Заголовок'
      placeholder='Введите заголовок'
      onChange={onInput('title')}
    />
    <Form.Field
      control={TextArea}
      label='Описание'
      placeholder='Введите описание курса'
      onChange={onInput('description')}
    />
    <Form.Field control={Button}>Добавить курс</Form.Field>
  </Form>
)

export default enhance(CreateNewCourse)
