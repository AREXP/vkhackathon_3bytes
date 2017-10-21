import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose, lifecycle, withProps } from 'recompose'
import { propEq, find } from 'ramda'
import { Card, Label, Icon } from 'semantic-ui-react'
import { Column } from 'components/Column'

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
      fetchLesson({ course, lesson })
    },
  }),
  withProps(({
    courses: { content },
    match: { params: { course, lesson } },
    lessons,
  }) => ({
    course: find(propEq('id', Number(course)), content) || {},
    lesson: lessons[`${course}/${lesson}`],
  })),
)

const Lesson = ({ lesson, match: { params: { course } } }) => lesson ?
  <Column>
    <Label size='big'>
      <Link to={`/${course}`}><Icon name='chevron left' /> Back to course</Link>
    </Label>
    <Card fluid>
      <Card.Content>
        <Card.Header>{lesson.title}</Card.Header>
        <Card.Meta>
          {(new Date(lesson.createdAt * 1e3)).toString()}
        </Card.Meta>
        <Card.Description>{lesson.description}</Card.Description>
      </Card.Content>
    </Card>
  </Column> : null

export default enhance(Lesson)
