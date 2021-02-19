import React, { useEffect } from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Provider } from 'react-redux'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import PrivateRoute from 'app/components/PrivateRoute'
import routes from 'app/constants/routes'
import NavBar from 'app/components/NavBar'
import SignUp from 'app/containers/Login/SignUp'
import SignIn from 'app/containers/Login/SignIn'
import ExercisesCategories from 'app/containers/ExercisesCategories'
import ExercisesList from 'app/containers/ExercisesList'
import ExerciseCreation from 'app/containers/ExerciseCreation'
import Bpmn from 'app/containers/Exercise/Bpmn'
import Class from 'app/containers/Exercise/Class'
import Flow from 'app/containers/Exercise/Flow'
import { authStateListener } from 'app/services/authFirebase'
import firebase from 'app/services/firebaseApi'
import reducer from 'app/store/user'

import '../../node_modules/@syncfusion/ej2-react-diagrams/styles/material.css'

const rootReducer = combineReducers({
  user: reducer,
})

export type RootState = ReturnType<typeof rootReducer>

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, logger)),
)

const App = (): JSX.Element => {
  // TODO  analytics.isSupported()
  firebase.analytics()

  useEffect(() => {
    // TODO add auth flow https://reactrouter.com/web/example/auth-workflow
    authStateListener()
  }, [])

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
        />
        <NavBar />
        <Switch>
          <Route path="/" exact component={SignIn} />
          <Route path={`/${routes.signIn}`} exact component={SignIn} />
          <Route path={`/${routes.signUp}`} exact component={SignUp} />
          <PrivateRoute
            path={`/${routes.exercisesCategories}`}
            exact
            component={ExercisesCategories}
          />
          <PrivateRoute
            path={`/${routes.exercisesList}`}
            exact
            component={ExercisesList}
          />
          <PrivateRoute
            path={`/${routes.exerciseCreation}`}
            exact
            component={ExerciseCreation}
          />
          <PrivateRoute
            path={`/${routes.bpmnExercise}`}
            exact
            component={Bpmn}
          />
          <PrivateRoute
            path={`/${routes.classExercise}`}
            exact
            component={Class}
          />
          <PrivateRoute
            path={`/${routes.flowExercise}`}
            exact
            component={Flow}
          />
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

export default App
