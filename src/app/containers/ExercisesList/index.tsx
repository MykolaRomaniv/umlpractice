import React, { useEffect } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { bindActionCreators, Dispatch } from 'redux'
import { connect, ConnectedProps } from 'react-redux'

import useQuery from 'app/hooks/useQuery'
import exercisesCategories from 'app/constants/exerciseCategories'
import { ReduxState } from 'app/types'
import { AllAction } from 'app/store/action'
import userActions from 'app/store/user/actions'
import ExerciseItem from '../../components/ExerciseItem'
import useStyles from './styles'

// const exercises: IExerciseItem[] | undefined = [
//   { name: 'Завдання 2', deadline: 'До 15.01 12:00', type: 'Class' },
//   { name: 'Завдання 3', deadline: 'До 15.01 12:00', type: 'BPMN' },
//   { name: 'Завдання 4', deadline: 'До 15.01 12:00', type: 'Flow' },
// ]

const mapStateToProps = (state: ReduxState) => ({
  userType: state.user.userData?.type,
  tasks: state.user.tasks,
})

const mapDispatchToProps = (dispatch: Dispatch<AllAction>) => ({
  actions: bindActionCreators(userActions, dispatch),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type IProps = ConnectedProps<typeof connector>

const ExercisesList = ({
  userType,
  tasks,
  actions: { getTasks, selectTask },
}: IProps): JSX.Element => {
  const classes = useStyles()
  const categoryType = useQuery().get('type')

  useEffect(() => {
    getTasks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSelectTask = (taskName: string) => {
    selectTask(taskName)
  }

  return (
    <div className={classes.root}>
      {categoryType === exercisesCategories.modeling &&
      userType === 'student' ? (
        <>
          <Typography variant="h4" component="h2" className={classes.headers}>
            {'Вправи'}
          </Typography>
          <List component="div">
            {tasks &&
              tasks.map((item) => (
                <ExerciseItem
                  key={item.taskName}
                  name={item.taskName}
                  // deadline={item.deadline}
                  type={item.type}
                  onSelect={onSelectTask}
                />
              ))}
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
        </>
      ) : (
        <Container className={classes.headerCenter}>
          <Typography
            variant="h4"
            component="h2"
            className={classes.headerCenter}
          >
            {'У вас поки немає завдань з цієї категорії\r'}
          </Typography>
          <Typography component="p">
            {'Попросіть вчителя створити для вас'}
          </Typography>
        </Container>
      )}
    </div>
  )
}

export default connector(ExercisesList)
