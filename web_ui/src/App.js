import React from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from 'react-router-dom'
import styled from 'react-emotion'
import { padding } from 'styles/palette'
import { Course } from './routes/Course'
import { CSSTransitionGroup } from 'react-transition-group'
import { Lesson, reducer as lessons } from './routes/Lesson'
import { Courses, reducer as courses } from './routes/Courses'
import StartScreen from './routes/StartScreen'

export const reducers = {
  courses,
  lessons,
}

const AppWrapper = styled('div')`
  padding: ${padding.L};
`

export const App = () => (
  <Router>
    <AppWrapper>
      <Switch>
        <Route exact path="/main" component={StartScreen} />
        <Route exact path="/:course" component={Course} />
        <Route exact path="/:course/:lesson" component={Lesson} />
        <Route exact path="/" component={Courses} />
      </Switch>
    </AppWrapper>
  </Router>
)
