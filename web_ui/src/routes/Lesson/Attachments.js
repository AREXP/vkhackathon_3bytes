import React from 'react'
import { compose, withState, withHandlers } from 'recompose'
import { Button, Modal, Image, Input, Divider, Header } from 'semantic-ui-react'

const enhance = compose(
  withState('state', 'setState', {}),
  withState('modal', 'setModal', false),
  withHandlers({
    openModal: ({ setModal }) => e => { e.preventDefault(); setModal(true) },
    closeModal: ({ setModal }) => e => { e.preventDefault(); setModal(false) },
    onInput: ({ setState }) => name => (e, { value }) => {
      setState(state => ({
        ...state,
        [name]: value,
      }))
    },
    onSubmit: ({ setModal, state: { annotation = '' }, addAttachment }) => (photo, owner, media) => {
      addAttachment({
        annotation,
        owner,
        photo,
        media,
        type: 'photo',
      })
      setModal(false)
    },
  }),
)

const Attachments = ({ openModal, closeModal, modal, onInput, lessons = {}, onSubmit }) => (
  <Modal
    open={modal}
    onClose={closeModal}
    trigger={
      <Button onClick={openModal}>Добавить материал</Button>
    }
    closeIcon
  >
    <Modal.Header>Добавить материал</Modal.Header>
    <Modal.Content>
      <Header>Добавить аннотацию</Header>
      <Input
        placeholder='Аннотация'
        onChange={onInput('annotation')}
      />
    </Modal.Content>
    <Divider />
    <Modal.Header>Нажмите чтобы выбрать</Modal.Header>
    <Modal.Content>
      <Image.Group size='small'>
        {lessons.photos && lessons.photos.items && lessons.photos.items.map(({ photo_604, owner_id, id }) => (
          <Image
            src={photo_604}
            key={photo_604}
            style={{ cursor: 'pointer' }}
            onClick={() => onSubmit(photo_604, owner_id, id)}
          />
        ))}
      </Image.Group>
    </Modal.Content>
  </Modal>
)

export default enhance(Attachments)
