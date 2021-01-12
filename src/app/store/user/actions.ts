import { AppThunkAsync, IError, IUser } from 'app/types'
import action from 'app/store/action'
import notify from 'app/services'
import ActionType from './types'

export const userLogin = (
  user: IUser,
  onSuccess?: (userData: IUser | undefined) => void,
  onError?: (e: IError) => void,
): AppThunkAsync<IUser | undefined> => async (dispatch) => {
  dispatch(action(ActionType.SIGN_IN_BEGIN))

  try {
    dispatch(action(ActionType.SIGN_IN_SUCCESS, user))
    onSuccess?.(user)
  } catch (error) {
    notify(error)
    dispatch(action(ActionType.SIGN_IN_ERROR, error))
    onError?.(error)
  }
}

export const updateUser = (
  user: IUser,
  onSuccess?: () => void,
): AppThunkAsync => async (dispatch) => {
  dispatch(action(ActionType.UPDATE_USER, user))
  onSuccess?.()
}

export const userLogout = (onSuccess?: () => void): AppThunkAsync => async (
  dispatch,
) => {
  // TODO add here or delete from types SIGN_OUT_BEGIN and SIGN_OUT_ERROR
  dispatch(action(ActionType.SIGN_OUT_SUCCESS))
  onSuccess?.()
}

export default {
  userLogin,
  updateUser,
  userLogout,
}
