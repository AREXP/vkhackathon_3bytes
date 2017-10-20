import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose, lifecycle, withProps } from 'recompose'
import { propEq, find, toString } from 'ramda'
import { Card, Radio, Label, Icon } from 'semantic-ui-react'
import { Column } from 'components/Column'

import * as actionCreators from '../Courses/module'

const mapStateToProps = ({ courses }) => ({ courses })

const enhance = compose(
  connect(mapStateToProps, actionCreators),
  lifecycle({
    componentWillMount() {
      const { match: { params: { course } }, fetchCourse } = this.props
      fetchCourse(course)
    },
  }),
  withProps(({
    courses: { content },
    match: { params: { course } },
  }) => ({
    course: find(propEq('id', Number(course)), content) || {},
  })),
)

const Course = ({
  course: {
    attachments, description, createdAt, title,
  },
}) => (
  <Column>
    <Label size='big'>
      <Link to='/'><Icon name='chevron left' /> All courses</Link>
    </Label>
    <Card fluid>
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>
          {(new Date(createdAt * 1e3)).toString()}
        </Card.Meta>
        <Card.Description>{description}</Card.Description>
        <p>{toString(attachments)}</p>
      </Card.Content>
    </Card>
  </Column>
)

export default enhance(Course)
