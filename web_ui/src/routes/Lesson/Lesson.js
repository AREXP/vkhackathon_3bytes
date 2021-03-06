import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose, lifecycle, withProps } from 'recompose'
import { Card, Label, Icon, Radio, Form, Segment, Dimmer, Loader, Image, Header } from 'semantic-ui-react'
import { Column } from 'components/Column'
import QuestionPreview from './QuestionPreview'

import CreateNewLesson from './CreateNewLesson'
import * as actionCreators from './module'

const mapStateToProps = ({ courses, lessons }) => ({
  courses,
  lessons,
})

const enhance = compose(
  connect(mapStateToProps, actionCreators),
  lifecycle({
    componentWillMount() {
      const { match: { params: { course, lesson } }, fetchLesson } = this.props
      if (lesson !== 'new_lesson') {
        fetchLesson({ course, lesson })
      }
    },
  }),
  withProps(({
    match: { params: { course, lesson } },
    lessons,
  }) => ({
    lesson: lessons[`${course}/${lesson}`],
    isNew: lesson === 'new_lesson',
  })),
)

const Quiz = ({ title, answers = [] }) => (
  <Card fluid>
    <Card.Content>
      <Card.Header>{title}</Card.Header>
      <Form>
        {answers.map(({ id, value, correct }) => (
          <Form.Field key={id}>
            <label>{value}</label>
            <Radio checked={correct} toggle />
          </Form.Field>
        ))}
      </Form>
    </Card.Content>
  </Card>
)

const Lesson = ({ lesson = {}, match: { params: { course } }, isNew, sendLesson, lessons }) => (
  <Column>
    <Label size='big'>
      <Link to={`/${course}`}><Icon name='chevron left' /> Вернуться к курсу</Link>
    </Label>
    {isNew ?
      <CreateNewLesson
        onSubmit={sendLesson}
        courseId={course}
        lessons={lessons}
      />
      :
      <Column>
        <Card fluid>
          {!lesson.title ?
            <Segment style={{ height: '100px' }}>
              <Dimmer active inverted>
                <Loader inverted>Загрузка</Loader>
              </Dimmer>
            </Segment>
            :
            <Card.Content>
              <Card.Header>{lesson.title}</Card.Header>
              <Card.Meta>
                {(new Date(lesson.createdAt)).toLocaleString()}
              </Card.Meta>
              <Card.Description>{lesson.description}</Card.Description>
            </Card.Content>
          }
        </Card>
        {lesson.attachments &&
          <Image.Group size='small'>
            {lesson.attachments.map(
              ({ media, type, owner }) =>
                <Image key={media} src={lessons.photos.items.find(({ id }) => id === media).photo_604} />,
            )}
          </Image.Group>
        }
        <Header>Вопросы к занятию</Header>
        {lesson && <QuestionPreview data={lesson.questions} />}
      </Column>
    }
  </Column>
)

export default enhance(Lesson)
