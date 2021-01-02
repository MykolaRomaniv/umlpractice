import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import List from '@material-ui/core/List'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import ListItemText from '@material-ui/core/ListItemText'

import ListItemLink from 'app/components/ListItemLink'
import routes from 'app/constants/routes'
import useStyles from './styles'

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
