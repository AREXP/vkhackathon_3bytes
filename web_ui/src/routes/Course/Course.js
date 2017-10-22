import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose, lifecycle, withProps } from 'recompose'
import { propEq, find } from 'ramda'
import { Card, Label, Icon, Button, Segment, Dimmer, Loader } from 'semantic-ui-react'
import { Column } from 'components/Column'
import CreateNewCourse from './CreateNewCourse'

import * as actionCreators from '../Courses/module'

const mapStateToProps = ({ courses }) => ({ courses })

const enhance = compose(
  connect(mapStateToProps, actionCreators),
  lifecycle({
    componentWillMount() {
      const { match: { params: { course } }, fetchCourse } = this.props
      if (course !== 'new_course') {
        fetchCourse(course)
      }
    },
  }),
  withProps(({
    courses: { content, courseLoading },
    match: { params: { course } },
  }) => ({
    course: content && find(propEq('id', Number(course)), content) || {},
    isNew: course === 'new_course',
    courseLoading,
  })),
)

const LessonPreview = ({ id, title, description, createdAt, courseId, deleteLesson }) => (
  <Card fluid>
    <Card.Content>
      <Card.Header>
        <Link to={`/${courseId}/${id}`}>{title}</Link>
      </Card.Header>
      <Card.Meta>
        {(new Date(createdAt)).toLocaleString()}
      </Card.Meta>
      <Card.Description>
        {typeof description === 'string' &&
          (description.length >= 160 ?
            `${description.slice(0, 160)}...` :
            description
          )
        }
      </Card.Description>
    </Card.Content>
    <Card.Content extra style={{ textAlign: 'right' }}>
      <Button onClick={() => deleteLesson({ courseId, id })} animated='vertical'>
        <Button.Content hidden>Удалить</Button.Content>
        <Button.Content visible>
          <Icon name='trash' />
        </Button.Content>
      </Button>
    </Card.Content>
  </Card>
)

const LessonAdd = ({ courseId }) => (
  <Card fluid>
    <Card.Content>
      <Card.Header>
        <Link to={`/${courseId}/new_lesson`}><Icon name='plus' /> Создать новое занятие</Link>
      </Card.Header>
    </Card.Content>
  </Card>
)

const Course = ({
  course: {
    id, description, createdAt, title, lessons, courseLoading,
  }, isNew, sendCourse, deleteLesson,
}) => (
  <Column>
    <Label size='big'>
      <Link to='/'><Icon name='chevron left' /> Вернуться к курсам</Link>
    </Label>
    {isNew ? <CreateNewCourse onSubmit={sendCourse} /> : [
      <Card fluid key='card'>
        <Card.Content>
          <Card.Header>{title}</Card.Header>
          <Card.Meta>
            {(new Date(createdAt)).toLocaleString()}
          </Card.Meta>
          <Card.Description>{description}</Card.Description>
        </Card.Content>
      </Card>,
      lessons && lessons.content && lessons.content.map(props => (
        <LessonPreview
          key={props.id}
          {...props}
          courseId={id}
          deleteLesson={deleteLesson}
        />
      )),
      courseLoading || !lessons ?
        <Segment key='preloader' style={{ height: '100px' }}>
          <Dimmer active inverted>
            <Loader inverted>Загрузка</Loader>
          </Dimmer>
        </Segment> : null,
      <LessonAdd key='addnew' courseId={id} />
    ]}
  </Column>
)

export default enhance(Course)
