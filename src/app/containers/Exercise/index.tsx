import React from 'react'
import List from '@material-ui/core/List'
import ListItem, { ListItemProps } from '@material-ui/core/ListItem'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import routes from 'app/constants/routes'
import ListItemText from '@material-ui/core/ListItemText'
import useStyles from './styles'

const ListItemLink = (props: ListItemProps<RouterLink, { button?: true }>) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <ListItem button component={RouterLink} {...props} />
}

const Exercise = (): JSX.Element => {
  const classes = useStyles()

  return (
    <List component="div">
      <ListItemLink
        button
        className={classes.listItem}
        to={`${routes.classExercise}`}
      >
        <Container className={classes.listItemTitle}>
          <ListItemText primary="Class" />
        </Container>
        <Container className={classes.buttonContainer}>
          <Link
            component={RouterLink}
            to={`/${routes.classExercise}`}
            variant="body2"
          >
            <Button variant="contained" color="primary">
              {'Виконати'}
            </Button>
          </Link>
        </Container>
      </ListItemLink>
      <ListItemLink
        button
        className={classes.listItem}
        to={`${routes.bpmnExercise}`}
      >
        <Container className={classes.listItemTitle}>
          <ListItemText primary="BPMN" />
        </Container>
        <Container className={classes.buttonContainer}>
          <Link
            component={RouterLink}
            to={`/${routes.bpmnExercise}`}
            variant="body2"
          >
            <Button variant="contained" color="primary">
              {'Виконати'}
            </Button>
          </Link>
        </Container>
      </ListItemLink>
      <ListItemLink
        button
        className={classes.listItem}
        to={`${routes.flowExercise}`}
      >
        <Container className={classes.listItemTitle}>
          <ListItemText primary="Flow" />
        </Container>
        <Container className={classes.buttonContainer}>
          <Link
            component={RouterLink}
            to={`/${routes.flowExercise}`}
            variant="body2"
          >
            <Button variant="contained" color="primary">
              {'Виконати'}
            </Button>
          </Link>
        </Container>
      </ListItemLink>
    </List>
  )
}

export default Exercise
