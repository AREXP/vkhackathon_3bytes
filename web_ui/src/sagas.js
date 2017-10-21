import { all } from 'redux-saga/effects'

import coursesSagas from './routes/Courses/sagas'
import courseSagas from './routes/Course/sagas'
import lessonsSagas from './routes/Lesson/sagas'

export default function* rootSaga() {
  yield all([
    ...coursesSagas,
    ...courseSagas,
    ...lessonsSagas,
  ])
}
