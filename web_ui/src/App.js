import React from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import { Course } from './routes/Course'
import { Courses, reducer as courses } from './routes/Courses'

export const reducers = {
  courses,
}

export const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Courses} />
      <Route path="/:course" component={Course} />
    </div>
  </Router>
)
