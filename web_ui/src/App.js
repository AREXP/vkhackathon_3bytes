import React from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import styled from 'react-emotion'
import { padding } from 'styles/palette'
import { Course } from './routes/Course'
import { Lesson, reducer as lessons } from './routes/Lesson'
import { Courses, reducer as courses } from './routes/Courses'

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
      <Route exact path="/" component={Courses} />
      <Route exact path="/:course" component={Course} />
      <Route exact path="/:course/:lesson" component={Lesson} />
    </AppWrapper>
  </Router>
)
