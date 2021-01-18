// eslint-disable-next-line import/no-cycle
import { IError, ITask, IUser } from 'app/types'

// eslint-disable-next-line no-shadow
enum ActionType {
  SIGN_UP_BEGIN = '[auth] SIGN_UP_BEGIN',
  SIGN_UP_SUCCESS = '[auth] SIGN_UP_SUCCESS',
  SIGN_UP_ERROR = '[auth] SIGN_UP_ERROR',
  SIGN_IN_BEGIN = '[auth] SIGN_IN_BEGIN',
  SIGN_IN_SUCCESS = '[auth] SIGN_IN_SUCCESS',
  SIGN_IN_ERROR = '[auth] SIGN_IN_ERROR',
  SIGN_OUT_BEGIN = '[auth] SIGN_OUT_BEGIN',
  SIGN_OUT_SUCCESS = '[auth] SIGN_OUT_SUCCESS',
  SIGN_OUT_ERROR = '[auth] SIGN_OUT_ERROR',
  CREATE_TASK_BEGIN = '[user] CREATE_TASK_BEGIN',
  CREATE_TASK_SUCCESS = '[user] CREATE_TASK_SUCCESS',
  CREATE_TASK_ERROR = '[user] CREATE_TASK_ERROR',
  GET_TASK_BEGIN = '[user] GET_TASK_BEGIN',
  GET_TASK_SUCCESS = '[user] GET_TASK_SUCCESS',
  GET_TASK_ERROR = '[user] GET_TASK_ERROR',
  MOVE_TASK_TO_DONE_BEGIN = '[user] MOVE_TASK_TO_DONE_BEGIN',
  MOVE_TASK_TO_DONE_SUCCESS = '[user] MOVE_TASK_TO_DONE_SUCCESS',
  MOVE_TASK_TO_DONE_ERROR = '[user] MOVE_TASK_TO_DONE_ERROR',
  SELECT_TASK = '[user] SELECT_TASK',
  UPDATE_USER = '[auth] UPDATE_USER',
}

export interface MoveTaskToDoneBeginAction {
  type: ActionType.MOVE_TASK_TO_DONE_BEGIN
}

export interface MoveTaskToDoneSuccessAction {
  type: ActionType.MOVE_TASK_TO_DONE_SUCCESS
  payload: ITask[]
}

export interface MoveTaskToDoneErrorAction {
  type: ActionType.MOVE_TASK_TO_DONE_ERROR
  payload: IError
}

export interface SelectTaskAction {
  type: ActionType.SELECT_TASK
  payload: string
}

export interface GetTaskBeginAction {
  type: ActionType.GET_TASK_BEGIN
}

export interface GetTaskSuccessAction {
  type: ActionType.GET_TASK_SUCCESS
  payload: ITask[]
}

export interface GetTaskErrorAction {
  type: ActionType.GET_TASK_ERROR
  payload: IError
}

export interface CreateTaskBeginAction {
  type: ActionType.CREATE_TASK_BEGIN
}

export interface CreateTaskSuccessAction {
  type: ActionType.CREATE_TASK_SUCCESS
  payload: ITask
}

export interface CreateTaskErrorAction {
  type: ActionType.CREATE_TASK_ERROR
  payload: IError
}

export interface SignUpBeginAction {
  type: ActionType.SIGN_UP_BEGIN
}

export interface SignUpSuccessAction {
  type: ActionType.SIGN_UP_SUCCESS
  payload: IUser
}

export interface SignUpErrorAction {
  type: ActionType.SIGN_UP_ERROR
  payload: IError
}

export interface SignInBeginAction {
  type: ActionType.SIGN_IN_BEGIN
}

export interface SignInSuccessAction {
  type: ActionType.SIGN_IN_SUCCESS
  payload: IUser
}

export interface SignInErrorAction {
  type: ActionType.SIGN_IN_ERROR
  payload: IError
}

export interface SignOutBeginAction {
  type: ActionType.SIGN_OUT_BEGIN
}

export interface SignOutSuccessAction {
  type: ActionType.SIGN_OUT_SUCCESS
}

export interface SignOutErrorAction {
  type: ActionType.SIGN_OUT_ERROR
  payload: IError
}

export interface UpdateUser {
  type: ActionType.UPDATE_USER
  payload: IUser
}

export type Action =
  | SignUpBeginAction
  | SignUpSuccessAction
  | SignUpErrorAction
  | SignInBeginAction
  | SignInSuccessAction
  | SignInErrorAction
  | SignOutBeginAction
  | SignOutSuccessAction
  | SignOutErrorAction
  | UpdateUser
  | CreateTaskBeginAction
  | CreateTaskBeginAction
  | CreateTaskErrorAction
  | GetTaskBeginAction
  | GetTaskSuccessAction
  | GetTaskErrorAction
  | SelectTaskAction
  | MoveTaskToDoneBeginAction
  | MoveTaskToDoneSuccessAction
  | MoveTaskToDoneErrorAction

export default ActionType
