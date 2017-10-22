import React from 'react'
import { compose, withState, withHandlers } from 'recompose'
import { Button, Modal, Image, Input, Divider } from 'semantic-ui-react'

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
    onSubmit: ({ state, addAttachment }) => (media, owner) => {
      console.log(state)
      console.log(media, owner)
    },
  }),
)

// "annotation": "string",
// "media": 0,
// "owner": 0,
// "type": "string"

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
      <Input
        placeholder='Аннотация'
        onChange={onInput('annotation')}
      />
    </Modal.Content>
    <Divider />
    <Modal.Content>
      <Image.Group size='small'>
        {lessons.photos && lessons.photos.items && lessons.photos.items.map(({ photo_604, owner_id }) => (
          <Image
            src={photo_604}
            key={photo_604}
            style={{ cursor: 'pointer' }}
            onClick={() => onSubmit(photo_604, owner_id)}
          />
        ))}
      </Image.Group>
    </Modal.Content>
  </Modal>
)

export default enhance(Attachments)
