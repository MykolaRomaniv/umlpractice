import {
  AppThunkAsync,
  IError,
  ISignInData,
  ISignUpData,
  ITask,
  IUser,
} from 'app/types'
import action from 'app/store/action'
import notify from 'app/services/notify'
import {
  authStateListener,
  signInWithEmailPassword,
  signOut,
  signUpWithEmailPassword,
} from 'app/services/authFirebase'
import api from 'app/services/api'
import { AxiosResponse } from 'axios'
import ActionType from './types'

export const userSignUp = (
  data: ISignUpData,
  onSuccess?: () => void,
  onError?: (e: IError) => void,
): AppThunkAsync<ISignUpData | undefined> => async (dispatch) => {
  dispatch(action(ActionType.SIGN_UP_BEGIN))
  try {
    const res = await signUpWithEmailPassword(data.email, data.password)
    const user = { ...data, id: res.user?.uid }
    await api.post('users.json', user)
    dispatch(action(ActionType.SIGN_UP_SUCCESS, user))
    onSuccess?.()
  } catch (error) {
    notify(error)
    dispatch(action(ActionType.SIGN_UP_ERROR, error))
    onError?.(error)
  }
}

export const userSignIn = (
  data: ISignInData,
  onSuccess?: () => void,
  onError?: (e: IError) => void,
): AppThunkAsync<ISignInData | undefined> => async (dispatch) => {
  dispatch(action(ActionType.SIGN_IN_BEGIN))
  try {
    const res = await signInWithEmailPassword(data.email, data.password)
    const users: AxiosResponse<Record<string, IUser>> = await api.get(
      'users.json',
    )
    const user = Object.values(users.data).find(
      (userObj) => userObj.id === res.user?.uid,
    )
    dispatch(action(ActionType.SIGN_IN_SUCCESS, user))
    onSuccess?.()
  } catch (error) {
    notify(error)
    dispatch(action(ActionType.SIGN_IN_ERROR, error))
    onError?.(error)
  }
}

export const updateUser = (
  user: IUser,
  onSuccess?: () => void,
): AppThunkAsync<IUser> => async (dispatch) => {
  dispatch(action(ActionType.UPDATE_USER, user))
  onSuccess?.()
}

export const userSignOut = (
  onSuccess?: () => void,
  onError?: (error: IError) => void,
): AppThunkAsync => async (dispatch) => {
  dispatch(action(ActionType.SIGN_OUT_BEGIN))
  try {
    await signOut()
    authStateListener()
  } catch (error) {
    notify(error)
    dispatch(action(ActionType.SIGN_OUT_ERROR, error))
    onError?.(error)
  }
  dispatch(action(ActionType.SIGN_OUT_SUCCESS))
  onSuccess?.()
}

export const createTask = (
  data: ITask,
  onSuccess?: (task: ITask) => void,
  onError?: (error: IError) => void,
): AppThunkAsync => async (dispatch) => {
  dispatch(action(ActionType.CREATE_TASK_BEGIN))
  try {
    await api.post('tasks.json', data)
  } catch (error) {
    notify(error)
    dispatch(action(ActionType.CREATE_TASK_ERROR, error))
    onError?.(error)
  }
  dispatch(action(ActionType.CREATE_TASK_SUCCESS))
  onSuccess?.(data)
}

export const getTasks = (
  onSuccess?: (taskObj: ITask[]) => void,
  onError?: (error: IError) => void,
): AppThunkAsync => async (dispatch) => {
  dispatch(action(ActionType.GET_TASK_BEGIN))
  try {
    const res: AxiosResponse<ITask[]> = await api.get('tasks.json')
    const tasks = Object.values(res.data)
    dispatch(action(ActionType.GET_TASK_SUCCESS, tasks))
    onSuccess?.(tasks)
  } catch (error) {
    notify(error)
    dispatch(action(ActionType.GET_TASK_ERROR, error))
    onError?.(error)
  }
}

export const selectTask = (
  taskName: string,
  onSuccess?: () => void,
): AppThunkAsync => async (dispatch) => {
  dispatch(action(ActionType.SELECT_TASK, taskName))
  onSuccess?.()
}

export default {
  userSignUp,
  userSignIn,
  updateUser,
  userSignOut,
  createTask,
  getTasks,
  selectTask,
}
