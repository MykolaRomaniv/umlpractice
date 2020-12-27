import React from 'react'
import List from '@material-ui/core/List'
import ListItem, { ListItemProps } from '@material-ui/core/ListItem'
// import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
// import InboxIcon from '@material-ui/icons/Inbox'
// import DraftsIcon from '@material-ui/icons/Drafts'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'

import routes from 'app/constants/routes'
import useStyles from './styles'

const ListItemLink = (props: ListItemProps<RouterLink, { button?: true }>) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <ListItem button component={RouterLink} {...props} />
}

const ExercisesList = (): JSX.Element => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography variant="h4" component="h2" className={classes.headers}>
        {'Вправи'}
      </Typography>
      <List component="div">
        <ListItemLink
          button
          className={classes.listItem}
          to={`${routes.exercise}`}
        >
          <Container className={classes.listItemTitle}>
            {/* <ListItemIcon>
              <InboxIcon />
            </ListItemIcon> */}
            <ListItemText primary="Завдання 2" />
          </Container>
          <Container className={classes.listItemTags}>
            <Button
              variant="outlined"
              disableRipple
              component="div"
              className={classes.tag}
            >
              {'До 15.01 12:00'}
            </Button>
            <Button
              variant="outlined"
              className={classes.tag}
              disableRipple
              component="div"
            >
              {'Класів'}
            </Button>
          </Container>
          <Container className={classes.buttonContainer}>
            <Link
              component={RouterLink}
              to={`/${routes.exercise}`}
              variant="body2"
            >
              <Button variant="contained" color="primary">
                {'Виконати'}
              </Button>
            </Link>
          </Container>
        </ListItemLink>
      </List>
      <Divider className={classes.divider} />
      <Typography variant="h4" component="h2" className={classes.headers}>
        {'Зроблені\r'}
      </Typography>
      <List component="nav" aria-label="secondary mailbox folders">
        <ListItem button>
          <ListItemText primary="Завдання 1" />
        </ListItem>
      </List>
    </div>
  )
}

export default ExercisesList
