import {FormControlLabel, Radio, RadioGroup, TextField} from '@material-ui/core'
import {useField} from 'formik'
import React from 'react'

interface optionInt{
  label:string
  value:string
}

interface Props {
  placeholder?: string
  name: string
  type?: string
  label?: string
  value?: string
  options: optionInt[]
}

export default function IrisTextRadio(props: Props) {
  const [selectedValue, setSelectedValue] = React.useState('1');
  // const [fields, meta] = useField(props.name)
  // return (
  //   <Form.Field error={meta.touched && !!meta.error}>
  //     <label>{props.label}</label>
  //     <input {...fields} {...props} />
  //     {meta.touched && meta.error ? ( <Label basic color='red'>{meta.error}</Label> ) : null}
  //   </Form.Field>
  // )

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const [field, meta, helpers] = useField(props)
  return (
    <>
      <RadioGroup {...field} {...props} name={props.name} value={props.value} onChange={handleChange} row>
        {props.options!.map((option) => (
          <FormControlLabel
            checked={selectedValue === option.value}
            value={option.value}
            key={option.value} control={<Radio />} label={option.label.charAt(0).toUpperCase() + option.label.slice(1)}           
          />
        ))}
      </RadioGroup>

      {meta.touched && Boolean(meta.error) && <React.Fragment>{meta.error}</React.Fragment>}
    </>
  )
}
