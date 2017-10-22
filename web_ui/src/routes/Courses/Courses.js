import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Column } from 'components/Column'
import { Card, Radio, Icon, Button, Grid, Segment, Dimmer, Loader } from 'semantic-ui-react'

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
        {(new Date(createdAt)).toLocaleString()}
      </Card.Meta>
      <Card.Description>
        {description}
      </Card.Description>
      <Link to={`/${id}`}>{`Посмотреть курс ...`}</Link>
    </Card.Content>
    <Card.Content extra>
      <Grid columns='equal'>
        <Grid.Row>
          <Grid.Column style={{ paddingTop: '6px' }}>
            <Radio checked={isActive} label={'Курс активен'} toggle />
          </Grid.Column>
          <Grid.Column style={{ textAlign: 'right' }}>
            <Button onClick={() => deleteCourse(id)} animated='vertical'>
              <Button.Content hidden>Удалить</Button.Content>
              <Button.Content visible>
                <Icon name='trash' />
              </Button.Content>
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
        <Link to={`/new_course`}><Icon name='plus' /> Создать новый курс</Link>
      </Card.Header>
    </Card.Content>
  </Card>
)

const Courses = ({ courses: { content }, deleteCourse }) => (console.log(content),
  <Column marginBetween='XS'>
    {content && content.map(props =>
      <CoursePreview key={props.id} {...props} deleteCourse={deleteCourse} />,
    )}
    {!content &&
      <Segment style={{ height: '100px' }}>
        <Dimmer active inverted>
          <Loader inverted>Загрузка</Loader>
        </Dimmer>
      </Segment>
    }
    <CourseAdd />
  </Column>
)

export default enhance(Courses)
