import { takeEvery, call, put } from 'redux-saga/effects'
import { get, post } from '../../api'
import { fetchLesson, setLesson, sendLesson } from './module'
import { fetchCourse } from '../Courses/module'

export function* fetchLessonSaga({ payload: { course, lesson } }) {
  const data = yield call(get, `lessons/${lesson}?courseId=${course}`)
  yield put(setLesson({
    data,
    course,
    lesson,
  }))
}

export function* sendLessonSaga({ payload }) {
  yield call(post, 'lessons', payload)
  yield put(fetchCourse(payload.course.id))
}

function* watcher() {
  yield takeEvery(fetchLesson, fetchLessonSaga)
  yield takeEvery(sendLesson, sendLessonSaga)
}

export default [
  watcher()
]
