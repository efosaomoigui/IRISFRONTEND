import {useField} from 'formik'
import React from 'react'
import {Checkbox, Form, Label, Radio} from 'semantic-ui-react'

interface Props {
  placeholder: string
  name: string
  label?: string
  value? : string
}

export default function IrisRadio(props: Props) {
  const [field, meta, helpers] = useField(props.name)
  return (
    <Form.Field error={meta.touched && meta.error}>
      <label>{props.label}</label>
      <Radio fitted name={props.name} label={<label>{props.label}</label>} value={props.value}"" />
      {meta.touched && meta.error ? (
        <Label basic color='red'>
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  )
}
