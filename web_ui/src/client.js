import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import sagas from './sagas'
import { App, reducers } from './App'

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

if (module.hot) {
  module.hot.accept(() => {
    render()
  })
}
