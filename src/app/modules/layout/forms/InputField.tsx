import {TextField} from '@material-ui/core'
import {FieldConfig, useField} from 'formik'
import React from 'react'

interface Props extends FieldConfig {
  label: string
}

const InputField = ({label, ...props}: Props) => {
  const [field, meta] = useField(props)

  return (
    <TextField
      margin="normal"
      variant='outlined'
      fullWidth
      label={label}
      {...field}
      {...props}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
    />
  )
}

export default InputField
