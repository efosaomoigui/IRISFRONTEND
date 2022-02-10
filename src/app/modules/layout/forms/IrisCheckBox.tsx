import {useField} from 'formik'
import React from 'react'
import {Checkbox, Form, Label} from 'semantic-ui-react'

interface Props {
  placeholder: string
  name: string
  label?: string
}

export default function IrisCheckBox(props: Props) {
  const [field, meta, helpers] = useField(props.name)
  return (
    <Form.Field error={meta.touched && meta.error}>
      <label>{props.label}</label>
      <Checkbox fitted name={props.name} label={<label>{props.label}</label>} />
      {meta.touched && meta.error ? (
        <Label basic color='red'>
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  )
}
