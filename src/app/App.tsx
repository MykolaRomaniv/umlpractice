import React from 'react'
import { Switch, Route } from 'react-router-dom'
import routes from 'app/constants/routes'
import NavBar from 'app/components/NavBar'
import SignUp from 'app/containers/Login/SignUp'
import SignIn from 'app/containers/Login/SignIn'
import Album from 'app/containers/Album'

const App = (): JSX.Element => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/" exact component={SignUp} />
        <Route path={`/${routes.signIn}`} exact component={SignIn} />
        <Route path={`/${routes.exercises}`} exact component={Album} />
      </Switch>
    </>
  )
}

export default App
