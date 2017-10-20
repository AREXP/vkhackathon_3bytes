import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import * as actionCreators from './module'

const mapStateToProps = ({ courses }) => ({ courses })

const enhance = compose(
  connect(mapStateToProps, actionCreators),
)

const CoursePreview = ({ id, title, description, is_active, timestamp }) => (
  <div>
    <p>{title}</p>
    <p>{description}</p>
    <p>{is_active}</p>
    <p>{timestamp}</p>
    <Link to={`/${id}`}>{`to course ${id}`}</Link>
  </div>
)

const Courses = ({ courses: { content } }) => (
  <div>
    {content.map(props =>
      <CoursePreview key={props.title} {...props} />,
    )}
  </div>
)

export default enhance(Courses)
