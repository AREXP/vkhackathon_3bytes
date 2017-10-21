import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose, lifecycle, withProps } from 'recompose'
import { propEq, find, toString } from 'ramda'
import { Card, Radio, Label, Icon, Input, TextArea, Form, Button } from 'semantic-ui-react'
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
    courses: { content },
    match: { params: { course } },
  }) => ({
    course: content && find(propEq('id', Number(course)), content) || {},
    isNew: course === 'new_course',
  })),
)

const LessonPreview = ({ id, title, description, createdAt, courseId, deleteLesson }) => (
  <Card fluid>
    <Card.Content>
      <Card.Header>
        <Link to={`/${courseId}/${id}`}>{title}</Link>
      </Card.Header>
      <Card.Meta>
        {(new Date(createdAt * 1e3)).toString()}
      </Card.Meta>
      <Card.Description>
        {description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button onClick={() => deleteLesson({ courseId, id })}>
        <Icon name='trash' title='delete' /> Delete
      </Button>
    </Card.Content>
  </Card>
)

const LessonAdd = ({ courseId }) => (
  <Card fluid>
    <Card.Content>
      <Card.Header>
        <Link to={`/${courseId}/new_lesson`}><Icon name='plus' /> Create new lesson</Link>
      </Card.Header>
    </Card.Content>
  </Card>
)

const Course = ({
  course: {
    id, description, createdAt, title, lessons,
  }, isNew, sendCourse, deleteLesson,
}) => (
  <Column>
    <Label size='big'>
      <Link to='/'><Icon name='chevron left' /> All courses</Link>
    </Label>
    {isNew ? <CreateNewCourse onSubmit={sendCourse} /> : [
      <Card fluid key='card'>
        <Card.Content>
          <Card.Header>{title}</Card.Header>
          <Card.Meta>
            {(new Date(createdAt * 1e3)).toString()}
          </Card.Meta>
          <Card.Description>{description}</Card.Description>
        </Card.Content>
      </Card>,
      lessons && lessons.content && lessons.content.map(props => (
        <LessonPreview key={props.id} {...props} courseId={id} deleteLesson={deleteLesson} />
      )),
      <LessonAdd key='addnew' courseId={id} />
    ]}
  </Column>
)

export default enhance(Course)
