import React from 'react'
import ListItem, { ListItemProps } from '@material-ui/core/ListItem'
import { Link as RouterLink } from 'react-router-dom'

// ? decorator
const ListItemLink = (
  props: ListItemProps<RouterLink, { button?: true }>,
): JSX.Element => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <ListItem button component={RouterLink} {...props} />
)

export default ListItemLink
