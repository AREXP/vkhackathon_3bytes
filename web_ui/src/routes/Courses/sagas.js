import { put, call, takeEvery } from 'redux-saga/effects'
import { get, vkGet } from '../../api'
import { getCourses, setCourse, fetchCourse, fetchLesson, fetchAllCourses } from './module'

export function* fetchAllCoursesSaga() {
  const result = yield call(get, 'courses')
  yield put(getCourses(result))
}

export function* fetchCourseSaga({ payload }) {
  const course = yield call(get, `courses/${payload}`)
  const lessons = yield call(get, `lessons/?courseId=${payload}`)
  yield put(setCourse({ course, lessons }))
}

export function* getAlbumSaga() {
  const result = yield call(vkGet, `photos.getAlbums?owner_id=-1`)
  console.log(result)
}

function* watcher() {
  yield takeEvery(fetchCourse, fetchCourseSaga)
  yield takeEvery(fetchAllCourses, fetchAllCoursesSaga)
}

export default [
  fetchAllCoursesSaga(),
  watcher(),
]
