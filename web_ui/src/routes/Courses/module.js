import { createAction, createReducer } from 'redux-act'
import { update, evolve, findIndex, propEq } from 'ramda'

const initialState = {
  content: [],
}

export const getCourses = createAction('getCourses')
export const fetchCourse = createAction('getCourse')
export const fetchAllCourses = createAction('fetchAllCourses')
export const fetchLesson = createAction('getLesson')
export const setLesson = createAction('setLesson')
export const setCourse = createAction('setCourse')
export const sendCourse = createAction('sendCourse')

const reducer = createReducer({
  [getCourses]: (state, payload) => payload,
  [setLesson]: (state, payload) => {
    console.log(state, payload)
    return state
  },
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
    }, state),
}, initialState)

export default reducer
