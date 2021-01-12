import { combineReducers } from 'redux'

// eslint-disable-next-line import/no-cycle
import userReducer from './user'

const rootReducer = combineReducers({
  user: userReducer,
})

export default rootReducer
