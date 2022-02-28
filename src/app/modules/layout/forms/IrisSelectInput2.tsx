import {FormControl, InputLabel, MenuItem, Select} from '@material-ui/core'
import {FieldConfig, useField} from 'formik'
import React from 'react'
import { IRoleModel } from '../../auth/models/AuthInterfaces'
// import {Form, Label, MenuItem, Select} from 'semantic-ui-react'

export interface dataType{
  value:string
  index:string
}

interface Props extends FieldConfig {
  label: string
  options?:IRoleModel[]
}
const IrisSelectInput2 = ({label, options, ...props}: Props) => {
  const [field, meta, helpers] = useField(props.name)

  console.log("===] ", options)

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
        {options!.map(option =>{
          <MenuItem value={option.id}>{option.name}</MenuItem>
        })}

        {/* <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem> */}
      </Select>
    </FormControl>
  )
}

export {IrisSelectInput2}
