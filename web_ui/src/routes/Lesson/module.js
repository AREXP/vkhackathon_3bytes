import { createAction, createReducer } from 'redux-act'

const initialState = {
  albums: {
    count: 0,
    items: [],
  },
}

export const fetchLesson = createAction('getLesson')
export const setLesson = createAction('setLesson')
export const sendLesson = createAction('sendLesson')
export const setAlbums = createAction('setAlbums')

const reducer = createReducer({
  [setLesson]: (state, { data, course, lesson }) => ({
    ...state,
    [`${course}/${lesson}`]: data,
  }),
  [setAlbums]: (state, { albums, photos }) => ({
    ...state,
    albums,
    photos,
  }),
}, initialState)

export default reducer
