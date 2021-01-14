import React from 'react'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos'
import SvgIcon from '@material-ui/core/SvgIcon'
import AssessmentIcon from '@material-ui/icons/Assessment'

import routes from 'app/constants/routes'

export interface INavItem {
  text: string
  icon: typeof SvgIcon | JSX.Element
  link: string
}

export const studentNavItems: INavItem[] = [
  {
    text: 'Вправи',
    icon: <InboxIcon />,
    link: routes.exercisesCategories,
  },
  {
    text: 'Статистика',
    icon: <AssessmentIcon />,
    link: '#',
  },
]

export const teacherNavItems: INavItem[] = [
  {
    text: 'Створити вправу',
    icon: <AddToPhotosIcon />,
    link: routes.exerciseCreation,
  },
  ...studentNavItems,
]

export default { studentNavItems, teacherNavItems }
