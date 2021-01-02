import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '80%',
      marginTop: '5%',
      backgroundColor: theme.palette.background.paper,
      margin: 'auto',
    },
    divider: {
      marginTop: '10%',
    },
    headers: {
      paddingLeft: '10px',
      paddingTop: '15px',
    },
    headerCenter: {
      textAlign: 'center',
      backgroundColor: 'transparent',
    },
  }),
)

export default useStyles
