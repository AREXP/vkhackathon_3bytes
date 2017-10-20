import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Column } from 'components/Column'
import { Card, Radio, Icon } from 'semantic-ui-react'

import { CoursePreviewWrapper } from './components'
import * as actionCreators from './module'

const mapStateToProps = ({ courses }) => ({ courses })

const enhance = compose(
  connect(mapStateToProps, actionCreators),
)

const CoursePreview = ({ id, title, description, isActive, createdAt }) => (
  <Card fluid>
    <Card.Content>
      <Card.Header>
        <Link to={`/${id}`}>{title}</Link>
      </Card.Header>
      <Card.Meta>
        {(new Date(createdAt * 1e3)).toString()}
      </Card.Meta>
      <Card.Description>
        {description}
      </Card.Description>
      <Link to={`/${id}`}>{`View the course`}</Link>
    </Card.Content>
    <Card.Content extra>
      <Radio checked={isActive} toggle />
    </Card.Content>
  </Card>
)

const CourseAdd = () => (
  <Card fluid>
    <Card.Content>
      <Card.Header>
        <Link to={`/new_course`}><Icon name='plus' /> Create new course</Link>
      </Card.Header>
    </Card.Content>
  </Card>
)

const Courses = ({ courses: { content } }) => (
  <Column marginBetween='XS'>
    {content.map(props =>
      <CoursePreview key={props.id} {...props} />,
    )}
    <CourseAdd />
  </Column>
)

export default enhance(Courses)
