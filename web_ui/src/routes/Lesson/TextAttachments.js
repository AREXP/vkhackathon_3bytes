import React from 'react'
import { compose, withState, withHandlers } from 'recompose'
import { Button, Modal, Form, TextArea } from 'semantic-ui-react'

const enhance = compose(
  withState('state', 'setState', {}),
  withState('modal', 'setModal', false),
  withHandlers({
    openModal: ({ setModal }) => e => { e.preventDefault(); setModal(true) },
    closeModal: ({ setModal }) => e => { e.preventDefault(); setModal(false) },
    onInput: ({ setState, state }) => name => (e, { value }) => {
      console.log(state)
      setState(currentState => ({
        ...currentState,
        [name]: value,
      }))
    },
    onSubmit: ({ state, addAttachment }) => () => {
      console.log(state)
      // addAttachment
    },
  }),
)

const TextAttachments = ({ openModal, closeModal, modal, onInput, onSubmit }) => (
  <Modal
    open={modal}
    onClose={closeModal}
    trigger={
      <Button onClick={openModal}>Добавить текст</Button>
    }
  >
    <Modal.Header>Добавить текст</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field
          control={TextArea}
          placeholder='Введите текст'
          onChange={onInput('annotation')}
        />
        <Button onClick={(e) => { e.preventDefault(); onSubmit() }}>Добавить текст</Button>
      </Form>
    </Modal.Content>
  </Modal>
)

export default enhance(TextAttachments)
