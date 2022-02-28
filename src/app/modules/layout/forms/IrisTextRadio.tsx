import {FormControlLabel, Radio, RadioGroup, TextField} from '@material-ui/core'
import {useField} from 'formik'
import React from 'react'

interface Props {
  placeholder?: string
  name: string
  type?: string
  label?: string
  value?: string
  options: Array<string>
}

export default function IrisTextRadio(props: Props) {
  // const [fields, meta] = useField(props.name)
  // return (
  //   <Form.Field error={meta.touched && !!meta.error}>
  //     <label>{props.label}</label>
  //     <input {...fields} {...props} />
  //     {meta.touched && meta.error ? ( <Label basic color='red'>{meta.error}</Label> ) : null}
  //   </Form.Field>
  // )
  const [field, meta, helpers] = useField(props)
  return (
    <>
      <RadioGroup {...field} {...props} name={props.name} value={props.value} row>
        {props.options!.map((option) => (
          <FormControlLabel
            value={option}
            control={<Radio />}
            label={option.charAt(0).toUpperCase() + option.slice(1)}
            key={option}
          />
        ))}
      </RadioGroup>

      {meta.touched && Boolean(meta.error) && <React.Fragment>{meta.error}</React.Fragment>}
    </>
  )
}
