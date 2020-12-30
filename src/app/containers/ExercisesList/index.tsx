import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'

import ListItemLink from 'app/components/ListItemLink'
import routes from 'app/constants/routes'
import useQuery from 'app/hooks/useQuery'
import exercisesCategories from 'app/constants/exerciseCategories'
import useStyles from './styles'

const ExercisesList = (): JSX.Element => {
  const classes = useStyles()
  const categoryType = useQuery().get('type')

  return (
    <div className={classes.root}>
      <Typography variant="h4" component="h2" className={classes.headers}>
        {'Вправи'}
      </Typography>
      {categoryType === exercisesCategories.modeling && (
        <List component="div">
          <ListItemLink
            button
            className={classes.listItem}
            to={`${routes.classExercise}`}
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
                {'Class'}
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
          <ListItemLink
            button
            className={classes.listItem}
            to={`${routes.bpmnExercise}`}
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
                {'BPMN'}
              </Button>
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
                {'Flow'}
              </Button>
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
      )}
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
