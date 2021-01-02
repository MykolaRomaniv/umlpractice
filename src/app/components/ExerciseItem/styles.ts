import { createStyles, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
  createStyles({
    listItem: {
      display: 'flex',
      alignItems: 'center',
    },
    listItemTitle: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '35%',
      paddingLeft: 0,
    },
    listItemTags: {
      display: 'flex',
      alignItems: 'center',
    },
    tag: {
      marginLeft: '20px',
      '&:hover, &:focus': {
        backgroundColor: 'inherit',
      },
    },
    buttonContainer: {
      textAlign: 'right',
    },
  }),
)

export default useStyles
