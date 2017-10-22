import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import { login } from './api'
import sagas from './sagas'
import { App, reducers } from './App'
import { getParams } from './utils'

console.log(
  getParams(document.location.hash),
)

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  combineReducers(reducers),
  applyMiddleware(
    sagaMiddleware,
    logger,
  ),
)

sagaMiddleware.run(sagas)

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <App />
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  )
}

render()
// if (document.location.hash && getParams(document.location.hash).access_token) {
//   render()
//   console.log(getParams(document.location.hash))
// } else {
//   login()
// }

if (module.hot) {
  module.hot.accept(() => {
    render()
  })
}
