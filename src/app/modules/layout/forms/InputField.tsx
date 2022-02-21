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
      // sx={{m: 1, lineHeight: 50}}
      margin="normal"
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
