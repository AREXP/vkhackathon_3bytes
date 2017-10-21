import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Column } from 'components/Column'
import { Card, Radio, Icon, Button, Grid } from 'semantic-ui-react'

import * as actionCreators from './module'

const mapStateToProps = ({ courses }) => ({ courses })

const enhance = compose(
  connect(mapStateToProps, actionCreators),
)

const CoursePreview = ({ id, title, description, isActive, createdAt, deleteCourse }) => (
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
      <Grid columns='equal'>
        <Grid.Row>
          <Grid.Column>
            <Radio checked={isActive} toggle /> <label>Active course</label>
          </Grid.Column>
          <Grid.Column>
            <Button onClick={() => deleteCourse(id)}>
              <Icon name='trash' />Delete
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
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

const Courses = ({ courses: { content = [] }, deleteCourse }) => (
  <Column marginBetween='XS'>
    {content.map(props =>
      <CoursePreview key={props.id} {...props} deleteCourse={deleteCourse} />,
    )}
    <CourseAdd />
  </Column>
)

export default enhance(Courses)
