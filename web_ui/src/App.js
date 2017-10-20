import React from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import styled from 'react-emotion'
import { padding } from 'styles/palette'
import { Course } from './routes/Course'
import { Courses, reducer as courses } from './routes/Courses'

export const reducers = {
  courses,
}

const AppWrapper = styled('div')`
  padding: ${padding.L};
`

export const App = () => (
  <Router>
    <AppWrapper>
      <Route exact path="/" component={Courses} />
      <Route path="/:course" component={Course} />
    </AppWrapper>
  </Router>
)
