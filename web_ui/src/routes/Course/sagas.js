import { put, call, takeEvery } from 'redux-saga/effects'
import { post, remove } from '../../api'
import { sendCourse, fetchAllCourses, deleteLesson, fetchCourse } from '../Courses/module'

export function* sendCourseSaga({ payload }) {
  yield call(post, 'courses', payload)
  yield put(fetchAllCourses())
}

export function* deleteLessonSaga({ payload: { courseId, id } }) {
  yield call(remove, `lessons/${id}`)
  yield put(fetchCourse(courseId))
}

function* watcher() {
  yield takeEvery(sendCourse, sendCourseSaga)
  yield takeEvery(deleteLesson, deleteLessonSaga)
}

export default [watcher()]
