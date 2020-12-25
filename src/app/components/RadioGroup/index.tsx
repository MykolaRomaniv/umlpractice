import React from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

const RadioButtonsGroup = (): JSX.Element => {
  const [value, setValue] = React.useState('student')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value)
  }

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{'Role'}</FormLabel>
      <RadioGroup
        aria-label="role"
        name="role1"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="student" control={<Radio />} label="Student" />
        <FormControlLabel value="teacher" control={<Radio />} label="Teacher" />
      </RadioGroup>
    </FormControl>
  )
}

export default RadioButtonsGroup
