import {useField} from 'formik'
import React from 'react'
import {Form, Label} from 'semantic-ui-react'

interface Props {
  placeholder: string
  name: string
  type?:string
  label?: string
  value?:string
}

export default function IrisTextInput(props: Props) {
  const [fields, meta] = useField(props.name)
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <input {...fields} {...props} />
      {meta.touched && meta.error ? ( <Label basic color='red'>{meta.error}</Label> ) : null}
    </Form.Field>
  )
}
