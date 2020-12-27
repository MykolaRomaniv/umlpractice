import React from 'react'
import List from '@material-ui/core/List'
import ListItem, { ListItemProps } from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import InboxIcon from '@material-ui/icons/Inbox'
import DraftsIcon from '@material-ui/icons/Drafts'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import useStyles from './styles'

const ListItemLink = (props: ListItemProps<'a', { button?: true }>) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <ListItem button component="a" {...props} />
}

const ExercisesList = (): JSX.Element => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <List component="div">
        <ListItem button>
          <Container>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </Container>
          <Container>
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
            <Button variant="contained" color="primary">
              {'Виконати'}
            </Button>
          </Container>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItem>
      </List>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folders">
        <ListItem button>
          <ListItemText primary="Trash" />
        </ListItem>
        <ListItemLink href="#simple-list">
          <ListItemText primary="Spam" />
        </ListItemLink>
      </List>
    </div>
  )
}

export default ExercisesList
