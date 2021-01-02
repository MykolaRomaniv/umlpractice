import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '80%',
      marginTop: '5%',
      backgroundColor: theme.palette.background.paper,
      margin: 'auto',
    },
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
    buttonContainer: {
      textAlign: 'right',
    },
    tag: {
      marginLeft: '20px',
      '&:hover, &:focus': {
        backgroundColor: 'inherit',
      },
    },
    divider: {
      marginTop: '10%',
    },
    headers: {
      paddingLeft: '10px',
      paddingTop: '15px',
    },
  }),
)

export default useStyles
