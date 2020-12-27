import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import routes from 'app/constants/routes'
import NavBar from 'app/components/NavBar'
import SignUp from 'app/containers/Login/SignUp'
import SignIn from 'app/containers/Login/SignIn'
import ExercisesCategories from 'app/containers/ExercisesCategories'
import ExercisesList from 'app/containers/ExercisesList'
import Exercise from 'app/containers/Exercise'

import '../../node_modules/@syncfusion/ej2-react-diagrams/styles/material.css'

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/" exact component={SignUp} />
        <Route path={`/${routes.signIn}`} exact component={SignIn} />
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
        <Route path={`/${routes.exercise}`} exact component={Exercise} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
