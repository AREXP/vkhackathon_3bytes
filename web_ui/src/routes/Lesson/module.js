import { createAction, createReducer } from 'redux-act'

const initialState = {}

export const fetchLesson = createAction('getLesson')
export const setLesson = createAction('setLesson')

const reducer = createReducer({
  [setLesson]: (state, { data, course, lesson }) => ({
    ...state,
    [`${course}/${lesson}`]: data,
  }),
}, initialState)

export default reducer
