import {FormControl, InputLabel, MenuItem, Select} from '@material-ui/core'
import {FieldConfig, useField} from 'formik'
import React from 'react'
// import {Form, Label, MenuItem, Select} from 'semantic-ui-react'

interface Props extends FieldConfig {
  label: string
}
const IrisSelectInput2 = ({label, ...props}: Props) => {
  const [field, meta, helpers] = useField(props.name)

  return (
    <FormControl fullWidth>
      <InputLabel id='demo-simple-select-label'>{label}</InputLabel>
      <Select
        label={label}
        {...field}
        {...props}
        error={meta.touched && Boolean(meta.error)}
        // helperText={meta.touched && meta.error}
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  )
}

export {IrisSelectInput2}
