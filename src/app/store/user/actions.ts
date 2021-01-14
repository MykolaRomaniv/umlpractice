import {
  AppThunkAsync,
  IError,
  ISignInData,
  ISignUpData,
  IUser,
} from 'app/types'
import action from 'app/store/action'
import notify from 'app/services/notify'
import {
  signInWithEmailPassword,
  signUpWithEmailPassword,
} from 'app/services/emailFirebase'
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

export const userSignOut = (onSuccess?: () => void): AppThunkAsync => async (
  dispatch,
) => {
  // TODO add here or delete from types SIGN_OUT_BEGIN and SIGN_OUT_ERROR
  dispatch(action(ActionType.SIGN_OUT_SUCCESS))
  onSuccess?.()
}

export default {
  userSignUp,
  userSignIn,
  updateUser,
  userSignOut,
}
