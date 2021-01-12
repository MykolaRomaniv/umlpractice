import { AxiosError } from 'axios'
import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'

// eslint-disable-next-line import/no-cycle
import { AllActionType } from 'app/store/action'
// eslint-disable-next-line import/no-cycle
import rootReducer from 'app/store'

interface IBackendError {
  data?: {
    errors?: string | string[]
  }
}

export interface ISignInData {
  email: string
  password: string
}

export type IError<T = { errors: string[] }> =
  | {
      name?: string
      message?: string
      stack?: string
      code?: number
    }
  | string
  | string[]
  | AxiosError<T>
  | IBackendError

export type ReduxState = ReturnType<typeof rootReducer>

export type AppThunkAsync<ReturnType = unknown> = ThunkAction<
  Promise<ReturnType | undefined | void>,
  ReduxState,
  unknown,
  Action<AllActionType>
>

export interface IUser {
  type: 'student' | 'teacher'
  id: number | string
  name: string
  email: string
}
