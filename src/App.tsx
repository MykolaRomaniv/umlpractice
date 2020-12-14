import React from 'react'

import { Switch, Route } from 'react-router-dom'

import NavBar from './components/NavBar'

import SignUp from './containers/Login/SignUp'

import SignIn from './containers/Login/SignIn'

const App = (): JSX.Element => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
      </Switch>
    </>
  )
}

export default App
