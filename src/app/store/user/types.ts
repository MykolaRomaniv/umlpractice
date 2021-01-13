// eslint-disable-next-line import/no-cycle
import { IError, IUser } from 'app/types'

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
  UPDATE_USER = '[auth] UPDATE_USER',
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

export default ActionType
