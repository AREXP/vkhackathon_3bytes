import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose, lifecycle, withProps } from 'recompose'
import { propEq, find } from 'ramda'
import { Card, Label, Icon, Radio, Form, Segment } from 'semantic-ui-react'
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
    match: { params: { course, lesson } },
    lessons,
  }) => ({
    lesson: lessons[`${course}/${lesson}`],
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
    {lesson.questions && lesson.questions.map(props =>
      <Quiz key={props.id} {...props} />
    )}
  </Column> : null

export default enhance(Lesson)
