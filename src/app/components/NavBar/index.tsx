import React from 'react'
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
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos'
import AssessmentIcon from '@material-ui/icons/Assessment'
import SvgIcon from '@material-ui/core/SvgIcon'

import routes from 'app/constants/routes'
import ListItemLink from 'app/components/ListItemLink'

interface INavItem {
  text: string
  icon: typeof SvgIcon | JSX.Element
  link: string
}

const navItems: INavItem[] = [
  { text: 'Вправи', icon: <InboxIcon />, link: routes.exercisesCategories },
  {
    text: 'Створити вправу',
    icon: <AddToPhotosIcon />,
    link: routes.exerciseCreation,
  },
  { text: 'Статистика', icon: <AssessmentIcon />, link: '#' },
]

const NavBar = (): JSX.Element => {
  const [state, setState] = React.useState({
    isDrawer: false,
  })

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

    setState({ ...state, isDrawer: open })
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">{'Архітектура ПЗ (лабораторні)'}</Typography>
        </Toolbar>
      </AppBar>
      <Drawer open={state.isDrawer} onClose={toggleDrawer(false)}>
        <List>
          {navItems.map((item) => (
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

export default NavBar
