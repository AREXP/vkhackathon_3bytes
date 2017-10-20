// import { delay } from 'redux-saga'
import { put, all, call, takeEvery } from 'redux-saga/effects'
import { get } from '../../api'
import { getCourses, setCourse, fetchCourse } from './module'

export function* fetchAllCourses() {
  const result = yield call(get, 'courses')
  yield put(getCourses(result))
}

export function* fetchCourseSaga({ payload }) {
  const result = yield call(get, `courses/${payload}`)
  yield put(setCourse(result))
}

function* watcher() {
  yield takeEvery(fetchCourse, fetchCourseSaga)
}

export default function* rootSaga() {
  yield all([
    fetchAllCourses(),
    watcher(),
  ])
}
