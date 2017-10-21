import { takeEvery, call, put } from 'redux-saga/effects'
import { get } from '../../api'
import { fetchLesson, setLesson } from './module'

export function* fetchLessonSaga({ payload: { course, lesson } }) {
  const data = yield call(get, `lessons/${lesson}?courseId=${course}`)
  yield put(setLesson({
    data,
    course,
    lesson,
  }))
}

function* watcher() {
  yield takeEvery(fetchLesson, fetchLessonSaga)
}

export default [
  watcher()
]
