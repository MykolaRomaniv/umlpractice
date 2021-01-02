import React from 'react'

import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import { Link as RouterLink } from 'react-router-dom'
import ListItemText from '@material-ui/core/ListItemText'
import Link from '@material-ui/core/Link'

import ListItemLink from 'app/components/ListItemLink'
import routes from 'app/constants/routes'
import useStyles from './styles'

type IProps = IExerciseItem

const createExerciseLink = (type: ExerciseType) => {
  switch (type) {
    case 'Class':
      return routes.classExercise
    case 'BPMN':
      return routes.bpmnExercise
    case 'Flow':
      return routes.flowExercise
    default:
      break
  }
  return '#'
}

const ExerciseItem = ({
  name,
  deadline,
  type,
  buttonText,
}: IProps): JSX.Element => {
  const classes = useStyles()

  return (
    <ListItemLink
      button
      className={classes.listItem}
      to={`${createExerciseLink(type)}`}
    >
      <Container className={classes.listItemTitle}>
        {/* <ListItemIcon>
    <InboxIcon />
  </ListItemIcon> */}
        <ListItemText primary={name} />
      </Container>
      <Container className={classes.listItemTags}>
        {deadline && (
          <Button
            variant="outlined"
            disableRipple
            component="div"
            className={classes.tag}
          >
            {deadline}
          </Button>
        )}
        <Button
          variant="outlined"
          className={classes.tag}
          disableRipple
          component="div"
        >
          {type}
        </Button>
      </Container>
      <Container className={classes.buttonContainer}>
        <Link
          component={RouterLink}
          to={`/${createExerciseLink(type)}`}
          variant="body2"
        >
          <Button variant="contained" color="primary">
            {buttonText || 'Виконати'}
          </Button>
        </Link>
      </Container>
    </ListItemLink>
  )
}

export default ExerciseItem
