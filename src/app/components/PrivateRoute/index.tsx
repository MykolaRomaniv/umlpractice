/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux'

import routes from 'app/constants/routes'
import { ReduxState } from '../../types'

const mapStateToProps = (state: ReduxState) => ({
  user: state.user.userData,
})

const connector = connect(mapStateToProps)

interface IProps extends ConnectedProps<typeof connector>, RouteProps {
  // eslint-disable-next-line @typescript-eslint/ban-types
  // children?: any
}

const PrivateRoute = ({ user, component: Component, ...rest }: IProps) => {
  // const childrenWithProps = (props: RouteComponentProps) =>
  //   React.Children.map(children, (child) => {
  //     // checking isValidElement is the safe way and avoids a typescript error too
  //     if (React.isValidElement(child)) {
  //       return React.cloneElement(child, { ...props })
  //     }
  //     return child
  //   })

  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={(props) => {
        return user ? (
          Component && <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: `/${routes.signIn}`,
              state: { from: props.location },
            }}
          />
        )
      }}
    />
  )
}

export default connector(PrivateRoute)
