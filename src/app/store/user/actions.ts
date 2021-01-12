import { AppThunkAsync, IError, ISignInData, IUser } from 'app/types'
import action from 'app/store/action'
import notify from 'app/services'
import ActionType from './types'

// TODO add connection to server
export const userSignIn = (
  data: ISignInData,
  onSuccess?: () => void,
  onError?: (e: IError) => void,
): AppThunkAsync<ISignInData | undefined> => async (dispatch) => {
  dispatch(action(ActionType.SIGN_IN_BEGIN))
  try {
    dispatch(action(ActionType.SIGN_IN_SUCCESS, data))
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
  userSignIn,
  updateUser,
  userSignOut,
}
