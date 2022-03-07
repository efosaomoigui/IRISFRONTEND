
import {useField} from 'formik'
import React from 'react'
import { Form, Label, Select } from 'semantic-ui-react'

interface Props {
  placeholder: string 
  name: string
  label?: string
}

const options = [
  {text: 'one', value: 'Bag'},
  {text: 'two', value: 'Serial'},
  {text: 'three', value: 'Turkey'},
  {text: 'four', value: 'Afganistan'},
]


export default function IrisSelectInput(props: Props) {
  const [field, meta, helpers] = useField(props.name)
  return (
    <Form.Field  error={meta.touched && meta.error}>
      <label>{props.label}</label>
      <Select
        clearable
        options={options}
        value={field.value}
        onBlur={() => helpers.setTouched(true)}
        placeholder={props.placeholder}
      />
      {meta.touched && meta.error ? (
        <Label basic color='red'>
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  )
}


