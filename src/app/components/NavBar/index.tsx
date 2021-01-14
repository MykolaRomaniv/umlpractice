import React, { useEffect, useState } from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { connect, ConnectedProps } from 'react-redux'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Drawer from '@material-ui/core/Drawer'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import MailIcon from '@material-ui/icons/Mail'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import Link from '@material-ui/core/Link'

import { ReduxState } from 'app/types'
import userActions from 'app/store/user/actions'
import ListItemLink from 'app/components/ListItemLink'
import { AllAction } from 'app/store/action'
import routes from 'app/constants/routes'
import { INavItem, studentNavItems, teacherNavItems } from './navItems'
import useStyles from './styles'

const mapStateToProps = (state: ReduxState) => ({
  userType: state.user.userData?.type,
})

const mapDispatchToProps = (dispatch: Dispatch<AllAction>) => ({
  actions: bindActionCreators(userActions, dispatch),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type IProps = ConnectedProps<typeof connector>

const NavBar = ({
  actions: { userSignOut },
  userType,
}: IProps): JSX.Element => {
  const classes = useStyles()
  const { pathname } = useLocation()

  const [isDrawer, setIsDrawer] = useState(false)
  const [showLogOut, setShowLogOut] = useState(true)
  const [navItems, setNavItems] = useState<INavItem[]>()

  useEffect(() => {
    if (
      pathname === `/${routes.signIn}` ||
      pathname === `/${routes.signUp}` ||
      pathname === '/'
    ) {
      setShowLogOut(false)
    } else {
      setShowLogOut(true)
    }
  }, [pathname])

  useEffect(() => {
    if (userType === 'student') {
      setNavItems(studentNavItems)
    } else {
      setNavItems(teacherNavItems)
    }
  }, [userType])

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }

    setIsDrawer(open)
  }

  const onLogOut = () => {
    userSignOut()
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {'Архітектура ПЗ (лабораторні)'}
          </Typography>
          <Link
            component={RouterLink}
            to={`/${routes.signIn}`}
            variant="body2"
            color="inherit"
          >
            {showLogOut && (
              <Button color="inherit" onClick={onLogOut}>
                {'Logout'}
              </Button>
            )}
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer open={isDrawer} onClose={toggleDrawer(false)}>
        <List>
          {navItems?.map((item) => (
            <ListItemLink
              key={item.text}
              to={`/${item.link}`}
              button
              onClick={toggleDrawer(false)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemLink>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem button key="about">
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Про нас" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  )
}

export default connector(NavBar)
