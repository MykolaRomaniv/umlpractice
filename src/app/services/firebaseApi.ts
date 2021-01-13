import firebase from 'firebase/app'
import 'firebase/analytics'
// TODO uncomment when will use thin functionality
import 'firebase/auth'
// import 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: 'AIzaSyBhRZ86uJlsfrSVeNJDVB0sr0q2ZYr2IHQ',
  authDomain: 'umlpractice.firebaseapp.com',
  projectId: 'umlpractice',
  storageBucket: 'umlpractice.appspot.com',
  messagingSenderId: '152319139050',
  appId: '1:152319139050:web:569f0516c6ee833ba78b93',
  measurementId: 'G-M9R0GCB1G9',
}

// Initialize Firebase
const defaultFirebase = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()

export default defaultFirebase
