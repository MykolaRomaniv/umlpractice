import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import './index.css'
import App from 'app/App'
import reducer from 'app/store/user'

import reportWebVitals from './reportWebVitals'

const rootReducer = combineReducers({
  user: reducer,
})

export type RootState = ReturnType<typeof rootReducer>

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, logger)),
)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function

// to log results (for example: reportWebVitals(console.log))

// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals()
