import React from 'react'
import { Switch, Route } from 'react-router-dom'
import routes from 'constants/routes'
import NavBar from 'components/NavBar'
import SignUp from 'containers/Login/SignUp'
import SignIn from 'containers/Login/SignIn'
import Album from 'containers/Album'

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
