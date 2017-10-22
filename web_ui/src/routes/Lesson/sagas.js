import { takeEvery, call, put } from 'redux-saga/effects'
import { get, vkapi, post } from '../../api'
import { pathOr } from 'ramda'
import { fetchLesson, setLesson, sendLesson, setAlbums } from './module'
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


export function* getAlbumSaga() {
  const result = yield call(vkapi, {
    method: 'photos.getAlbums',
    payload: {
      owner_id: '-154325813',
    },
  })
  const photos = yield call(vkapi, {
    method: 'photos.get',
    payload: {
      owner_id: '-154325813',
      album_id: pathOr(-1, ['response', 'items', 0, 'id'], result),
    },
  })
  yield put(setAlbums({
    albums: result.response,
    photos: photos.response,
  }))
}

function* watcher() {
  yield takeEvery(fetchLesson, fetchLessonSaga)
  yield takeEvery(sendLesson, sendLessonSaga)
}

export default [
  watcher(),
  getAlbumSaga(),
]
