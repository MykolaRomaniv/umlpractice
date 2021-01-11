import { toast, ToastContent, ToastOptions } from 'react-toastify'

const textArray: string[] = []

const arrayHandler = (array: string[]) =>
  array.forEach((element: string) => textArray.push(element))

const stringHandler = (text: string) => textArray.push(text)

export interface IBackendError {
  message?: string
}

const notify = (
  text: string | string[] | IBackendError,
  type?: 'error' | 'success' | 'warning' | 'exit',
): void => {
  let notifier: (
    content: ToastContent,
    options?: ToastOptions | undefined,
  ) => React.ReactText

  switch (type) {
    case 'error':
      notifier = toast.error
      break
    case 'success':
      notifier = toast.success
      break
    case 'warning':
      notifier = toast.warning
      break
    case 'exit':
      notifier = toast.info
      break
    default:
      notifier = toast
  }

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
    notifier(el)
  })
}

export default notify
