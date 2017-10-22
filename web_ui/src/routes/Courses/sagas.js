import { put, call, takeEvery } from 'redux-saga/effects'
import { get, vkapi, remove } from '../../api'
import { getCourses, setCourse, fetchCourse, fetchAllCourses, deleteCourse } from './module'

export function* fetchAllCoursesSaga() {
  const result = yield call(get, 'courses')
  yield put(getCourses(result))
}

export function* fetchCourseSaga({ payload }) {
  const course = yield call(get, `courses/${payload}`)
  const lessons = yield call(get, `lessons/?courseId=${payload}`)
  yield put(setCourse({ course, lessons }))
}

export function* deleteCourseSaga({ payload }) {
  yield call(remove, `courses/${payload}`)
  yield put(fetchAllCourses())
}

function* watcher() {
  yield takeEvery(fetchCourse, fetchCourseSaga)
  yield takeEvery(fetchAllCourses, fetchAllCoursesSaga)
  yield takeEvery(deleteCourse, deleteCourseSaga)
}

export default [
  fetchAllCoursesSaga(),
  watcher(),
]
