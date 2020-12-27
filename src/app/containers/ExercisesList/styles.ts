import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '80%',
      backgroundColor: theme.palette.background.paper,
      margin: 'auto',
    },
    buttonContainer: {
      textAlign: 'right',
    },
    tag: {
      '&:hover, &:focus': {
        backgroundColor: 'inherit',
      },
    },
  }),
)

export default useStyles
