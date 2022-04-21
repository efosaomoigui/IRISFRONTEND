import { TextField } from '@material-ui/core';
import {useField} from 'formik'
import React from 'react'

interface Props {
  placeholder?: string
  name: string
  type?:string
  label?: string
  value?:string
}

export default function IrisTextInput(props: Props) {
  // const [fields, meta] = useField(props.name)
  // return (
  //   <Form.Field error={meta.touched && !!meta.error}>
  //     <label>{props.label}</label>
  //     <input {...fields} {...props} />
  //     {meta.touched && meta.error ? ( <Label basic color='red'>{meta.error}</Label> ) : null}
  //   </Form.Field>
  // )
  const [field, meta, helpers] = useField(props);
  return (
    <>
        <TextField  {...field} {...props} fullWidth variant='outlined' 
        error={meta.touched && Boolean(meta.error)}
                        className="form-control"
        helperText={meta.touched && meta.error}  />
    </>
  );

}
