import { createStyles } from '@material-ui/core/styles'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useStyles = () =>
  createStyles({
    points: {
      marginTop: '10px',
      textAlign: 'center',
      fontSize: '32px',
    },
    descriptionTextField: {
      width: '100%',
      marginBottom: '20px',
    },
  })

export default useStyles
