/* eslint-disable no-console */
import firebase from './firebaseApi'

export const signInWithEmailPassword = (
  email: string,
  password: string,
): Promise<firebase.default.auth.UserCredential> =>
  firebase.auth().signInWithEmailAndPassword(email, password)

export const signUpWithEmailPassword = async (
  email: string,
  password: string,
): Promise<firebase.default.auth.UserCredential> =>
  firebase.auth().createUserWithEmailAndPassword(email, password)

export const sendEmailVerification = (): void => {
  firebase
    .auth()
    ?.currentUser?.sendEmailVerification()
    .then(() => {
      console.log('Email verification sent!')
    })
}

export const sendPasswordReset = (email: string): void => {
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      console.log('Password reset email sent!')
    })
    .catch((error) => {
      console.log('error', error)
      const errorCode = error.code
      console.log('errorCode', errorCode)
      const errorMessage = error.message
      console.log('errorMessage', errorMessage)
    })
}

export const signOut = (): Promise<void> => firebase.auth().signOut()

export const authStateListener = ():
  | firebase.default.User
  | null
  | undefined => {
  let user
  firebase.auth().onAuthStateChanged((userObj) => {
    user = userObj
  })
  return user
}

export default {
  signInWithEmailPassword,
  signUpWithEmailPassword,
  sendEmailVerification,
  sendPasswordReset,
  signOut,
  authStateListener,
}
