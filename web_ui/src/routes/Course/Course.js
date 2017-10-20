import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose, lifecycle, withProps } from 'recompose'
import { propEq, find, toString } from 'ramda'

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
    attachments, description, timestamp, title,
  },
}) => (
  <div>
    <p>{title}</p>
    <p>{description}</p>
    <p>{timestamp}</p>
    <p>{toString(attachments)}</p>
    <Link to='/'>To all courses</Link>
  </div>
)

export default enhance(Course)
