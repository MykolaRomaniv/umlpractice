import React from 'react'
import List from '@material-ui/core/List'

import ExerciseItem from 'app/components/ExerciseItem'
import useStyles from './styles'

const exercises: IExerciseItem[] = [
  {
    name: 'Діаграма класів',
    type: 'Class',
  },
  {
    name: 'Діаграма BPMN',
    type: 'BPMN',
  },
  {
    name: 'Діаграма Flow',
    type: 'Flow',
  },
]

const Exercise = (): JSX.Element => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <List component="div">
        {exercises &&
          exercises.map((item) => (
            <ExerciseItem
              key={item.name}
              name={item.name}
              type={item.type}
              buttonText="Створити"
            />
          ))}
        {/* <ListItemLink
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
                {'Створити'}
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
        </ListItemLink> */}
      </List>
    </div>
  )
}

export default Exercise
