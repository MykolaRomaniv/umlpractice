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

const ExerciseItem = ({ name, deadline, type }: IProps): JSX.Element => {
  const classes = useStyles()

  return (
    <ListItemLink
      button
      className={classes.listItem}
      to={`${routes.classExercise}`}
    >
      <Container className={classes.listItemTitle}>
        {/* <ListItemIcon>
    <InboxIcon />
  </ListItemIcon> */}
        <ListItemText primary={name} />
      </Container>
      <Container className={classes.listItemTags}>
        <Button
          variant="outlined"
          disableRipple
          component="div"
          className={classes.tag}
        >
          {deadline}
        </Button>
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
          to={`/${routes.classExercise}`}
          variant="body2"
        >
          <Button variant="contained" color="primary">
            {'Виконати'}
          </Button>
        </Link>
      </Container>
    </ListItemLink>
  )
}

export default ExerciseItem
