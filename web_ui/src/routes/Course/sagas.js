import { put, call, takeEvery } from 'redux-saga/effects'
import { post } from '../../api'
import { sendCourse, fetchAllCourses } from '../Courses/module'

export function* sendCourseSaga({ payload }) {
  yield call(post, 'courses', payload)
  yield put(fetchAllCourses())
}

function* watcher() {
  yield takeEvery(sendCourse, sendCourseSaga)
}

export default [watcher()]
