import { toast, TypeOptions } from 'react-toastify'

const textArray: string[] = []

const arrayHandler = (array: string[]) =>
  array.forEach((element: string) => textArray.push(element))

const stringHandler = (text: string) => textArray.push(text)

export interface IBackendError {
  message?: string
}

const notify = (
  text: string | string[] | IBackendError,
  type: TypeOptions = 'error',
): void => {
  if (text) {
    if (Array.isArray(text)) {
      arrayHandler(text)
    } else if (typeof text === 'string') {
      stringHandler(text)
    } else if (typeof text.message === 'string') {
      stringHandler(text.message)
    }
  }

  textArray.forEach((el) => {
    toast(el, { type })
  })
}

export default notify
