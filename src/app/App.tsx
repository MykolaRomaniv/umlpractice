import React, { useEffect } from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
import { authStateListener } from 'app/services/emailFirebase'
import firebase from 'app/services/firebaseApi'

import '../../node_modules/@syncfusion/ej2-react-diagrams/styles/material.css'

const App = (): JSX.Element => {
  firebase.analytics()

  useEffect(() => {
    // TODO add auth flow https://reactrouter.com/web/example/auth-workflow
    authStateListener()
  }, [])

  return (
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
        <Route
          path={`/${routes.exercisesCategories}`}
          exact
          component={ExercisesCategories}
        />
        <Route
          path={`/${routes.exercisesList}`}
          exact
          component={ExercisesList}
        />
        <Route
          path={`/${routes.exerciseCreation}`}
          exact
          component={ExerciseCreation}
        />
        <Route path={`/${routes.bpmnExercise}`} exact component={Bpmn} />
        <Route path={`/${routes.classExercise}`} exact component={Class} />
        <Route path={`/${routes.flowExercise}`} exact component={Flow} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
