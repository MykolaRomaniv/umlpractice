/* eslint-disable react/require-default-props */
import React, { useEffect } from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

import { IUserType } from 'app/types'

interface IProps {
  onChange?: (value: IUserType) => void
}

const RadioButtonsGroup = ({ onChange }: IProps): JSX.Element => {
  const [value, setValue] = React.useState<IUserType>('student')

  useEffect(() => {
    onChange?.(value)
  }, [onChange, value])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value as IUserType)
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
