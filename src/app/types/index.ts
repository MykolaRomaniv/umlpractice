import { AxiosError } from 'axios'
import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'

// eslint-disable-next-line import/no-cycle
import { AllActionType } from 'app/store/action'
// eslint-disable-next-line import/no-cycle
import rootReducer from 'app/store'
import { ConnectorModel, NodeModel } from '@syncfusion/ej2-react-diagrams'

interface IBackendError {
  data?: {
    errors?: string | string[]
  }
}

export type IUserType = 'student' | 'teacher'

export interface ISignInData {
  email: string
  password: string
}

export interface ISignUpData extends ISignInData {
  type: IUserType
  name: string
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

export interface ITask {
  taskData: { nodes: NodeModel[]; connectors: ConnectorModel[] }
  description: string
  taskName: string
  type: ExerciseType
  nodes: NodeModel[]
  connectors: ConnectorModel[]
}

export interface IUser {
  type: IUserType
  id: number | string
  name: string
  email: string
  dbId?: string
  doneTasks?: ITask[]
}
