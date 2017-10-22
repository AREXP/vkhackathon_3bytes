import React from 'react'
import { compose, withState, withHandlers } from 'recompose'
import { Input, Button, Modal, Dropdown } from 'semantic-ui-react'
import { Column } from 'components/Column'

const correction = [
  { text: 'Правильный', value: 1 },
  { text: 'Неверный', value: 0 }
]

const enhance = compose(
  withState('state', 'setState', {}),
  withState('modal', 'setModal', false),
  withHandlers({
    openModal: ({ setModal }) => e => { e.preventDefault(); setModal(true) },
    closeModal: ({ setModal }) => e => { e.preventDefault(); setModal(false) },
    onInput: ({ setState }) => name => (e, { value }) =>
      setState(state => ({
        ...state,
        [name]: value,
      })),
  }),
  withHandlers({
    onSubmit: ({ setModal, state, addQuestion }) => e => {
      e.preventDefault()
      if (
        state.title &&
        state.answer_1 &&
        state.answer_2 &&
        state.answer_3 &&
        state.answer_4 &&
        (state.answer_1_correct ||
        state.answer_2_correct ||
        state.answer_3_correct ||
        state.answer_4_correct)
      ) {
        const result = {
          title: state.title,
          answers: [
            { value: state.answer_1, correct: Boolean(state.answer_1_correct) },
            { value: state.answer_2, correct: Boolean(state.answer_2_correct) },
            { value: state.answer_3, correct: Boolean(state.answer_3_correct) },
            { value: state.answer_4, correct: Boolean(state.answer_4_correct) }
          ],
        }
        setModal(false)
        addQuestion(result)
      } else {
        console.error(state)
        // add validation
      }
    },
  }),
)

const ModalAddNew = ({ onInput, openModal, closeModal, onSubmit, modal }) => (
  <Modal open={modal} onClose={closeModal} trigger={<Button onClick={openModal}>Добавить вопрос</Button>}>
    <Modal.Header>Добавить вопрос</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <Column padding='0 0 16px 0'>
          <Input
            label='Вопрос'
            placeholder='Введите вопрос'
            onChange={onInput('title')}
          />
          <Input
            label={
              <Dropdown
                defaultValue={0}
                options={correction}
                onChange={onInput('answer_1_correct')}
              />
            }
            labelPosition='right'
            placeholder='Ответ №1'
            onChange={onInput('answer_1')}
          />
          <Input
            label={
              <Dropdown
                defaultValue={0}
                options={correction}
                onChange={onInput('answer_2_correct')}
              />
            }
            labelPosition='right'
            placeholder='Ответ №2'
            onChange={onInput('answer_2')}
          />
          <Input
            label={
              <Dropdown
                defaultValue={0}
                options={correction}
                onChange={onInput('answer_3_correct')}
              />
            }
            labelPosition='right'
            placeholder='Ответ №3'
            onChange={onInput('answer_3')}
          />
          <Input
            label={
              <Dropdown
                defaultValue={0}
                options={correction}
                onChange={onInput('answer_4_correct')}
              />
            }
            labelPosition='right'
            placeholder='Ответ №4'
            onChange={onInput('answer_4')}
          />
        </Column>
        <Button onClick={onSubmit}>Принять</Button>
        <Button onClick={closeModal}>Отклонить</Button>
      </Modal.Description>
    </Modal.Content>
  </Modal>
)

export default enhance(ModalAddNew)
