// eslint-disable-next-line import/no-cycle
import { IError, IUser } from 'app/types'
// eslint-disable-next-line import/no-cycle
import ActionType, { Action } from './types'

export interface IState {
  isLoading: boolean
  error: IError | null
  userData: IUser | null
}

const initialState: IState = {
  isLoading: false,
  error: null,
  userData: null,
}

const reducer = (state = initialState, action: Action): IState => {
  switch (action.type) {
    case ActionType.SIGN_IN_BEGIN:
    case ActionType.SIGN_OUT_BEGIN: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case ActionType.SIGN_IN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: '',
        userData: action.payload,
      }
    }
    case ActionType.SIGN_OUT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: '',
        userData: null,
      }
    }
    case ActionType.UPDATE_USER: {
      return {
        ...state,
        isLoading: false,
        error: '',
        userData: action.payload,
      }
    }
    case ActionType.SIGN_IN_ERROR:
    case ActionType.SIGN_OUT_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    }
    default:
      return state
  }
}

export default reducer
