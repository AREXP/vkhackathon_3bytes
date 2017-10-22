import { createAction, createReducer } from 'redux-act'
import { update, evolve, findIndex, propEq, always } from 'ramda'

const initialState = {
  coursesLoading: false,
  courseLoading: false,
  content: null,
}

export const getCourses = createAction('getCourses')
export const fetchCourse = createAction('fetchCourse')
export const fetchAllCourses = createAction('fetchAllCourses')
export const fetchLesson = createAction('getLesson')
export const setLesson = createAction('setLesson')
export const setCourse = createAction('setCourse')
export const sendCourse = createAction('sendCourse')
export const deleteLesson = createAction('deleteLesson')
export const deleteCourse = createAction('deleteCourse')

const reducer = createReducer({
  [fetchAllCourses]: (state) => ({ ...state, coursesLoading: true }),
  [getCourses]: (state, payload) => ({ ...state, ...payload, coursesLoading: false }),
  [fetchCourse]: (state) => ({ ...state, courseLoading: true }),
  [setLesson]: (state) => state,
  [setCourse]: (state, { course, lessons }) =>
    evolve({
      content: update(
        findIndex(
          propEq('id', course.id),
          state.content,
        ),
        {
          ...course,
          lessons,
        },
      ),
      courseLoading: always(false),
    }, state),
}, initialState)

export default reducer
