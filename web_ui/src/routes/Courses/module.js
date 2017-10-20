import { createAction, createReducer } from 'redux-act'
import { update, evolve, findIndex, propEq } from 'ramda'

const initialState = {
  content: [],
}

export const getCourses = createAction('getCourses')
export const fetchCourse = createAction('getCourse')
export const setCourse = createAction('setCourse')

const reducer = createReducer({
  [getCourses]: (state, payload) => payload,
  [fetchCourse]: (state) => state,
  [setCourse]: (state, payload) =>
    evolve({
      content: update(
        findIndex(
          propEq('id', payload.id),
          state.content,
        ),
        payload,
      ),
    }, state),
}, initialState)

export default reducer
