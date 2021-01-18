// eslint-disable-next-line import/no-cycle
import { IError, ITask, IUser } from 'app/types'
// eslint-disable-next-line import/no-cycle
import ActionType, { Action } from './types'

export interface IState {
  isLoading: boolean
  error: IError | null
  userData: IUser | null
  tasks: ITask[] | null
  currentTask: ITask | null | undefined
}

const initialState: IState = {
  isLoading: false,
  error: null,
  userData: null,
  tasks: null,
  currentTask: null,
}

const reducer = (state = initialState, action: Action): IState => {
  switch (action.type) {
    case ActionType.SIGN_IN_BEGIN:
    case ActionType.SIGN_OUT_BEGIN:
    case ActionType.SIGN_UP_BEGIN:
    case ActionType.CREATE_TASK_BEGIN:
    case ActionType.GET_TASK_BEGIN:
    case ActionType.MOVE_TASK_TO_DONE_BEGIN: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case ActionType.MOVE_TASK_TO_DONE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: '',
        userData: {
          ...state.userData,
          doneTasks: action.payload,
        } as IUser,
      }
    }
    case ActionType.SIGN_UP_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: '',
        userData: action.payload,
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
    case ActionType.GET_TASK_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: '',
        tasks: action.payload.filter(
          (task) =>
            task.description && task.taskData && task.taskName && task.type,
          // task.nodes &&
          // task.connectors,
        ),
      }
    }
    case ActionType.SELECT_TASK: {
      return {
        ...state,
        isLoading: false,
        error: '',
        currentTask: state.tasks?.find(
          (task) => task.taskName === action.payload,
        ),
      }
    }
    case ActionType.SIGN_IN_ERROR:
    case ActionType.SIGN_OUT_ERROR:
    case ActionType.SIGN_UP_ERROR:
    case ActionType.CREATE_TASK_ERROR:
    case ActionType.GET_TASK_ERROR: {
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
