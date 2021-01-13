import React, { useState } from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { connect, ConnectedProps } from 'react-redux'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { Link as RouterLink } from 'react-router-dom'

import RadioGroup from 'app/components/RadioGroup'
import routes from 'app/constants/routes'
import { AllAction } from 'app/store/action'
import userActions from 'app/store/user/actions'
import { IUserType } from 'app/types'

import useStyles from './styles'

const mapDispatchToProps = (dispatch: Dispatch<AllAction>) => ({
  actions: bindActionCreators(userActions, dispatch),
})

const connector = connect(null, mapDispatchToProps)

type IProps = ConnectedProps<typeof connector>

const SignUp = ({ actions: { userSignUp } }: IProps): JSX.Element => {
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [userType, setUserType] = useState<IUserType>('student')

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }
  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const onSignUp = () => userSignUp({ email, password, name, type: userType })

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {'Sign up\r'}
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={name}
                onChange={handleName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={handleEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={handlePassword}
              />
            </Grid>
            <Grid item xs={12}>
              <RadioGroup onChange={setUserType} />
            </Grid>
          </Grid>
          <Link
            component={RouterLink}
            to={`/${routes.exercisesCategories}`}
            variant="body2"
          >
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onSignUp}
            >
              {'Sign Up\r'}
            </Button>
          </Link>
          <Grid container justify="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/sign-in" variant="body2">
                {'Already have an account? Sign in\r'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export default connector(SignUp)
