import {Grid, Typography} from '@material-ui/core'
import {FormikConfig, FormikValues} from 'formik'
import React from 'react'
import {OptionalObjectSchema} from 'yup/lib/object'
import InputField from './InputField'

interface Props extends FormikConfig<FormikValues> {
  stepName: string
  onSubmit: (values: FormikValues) => void
  validationSchema: OptionalObjectSchema<any>
  initialValues: {}
}

const FormStep = ({stepName, onSubmit, validationSchema, initialValues}: Props) => {
  return (
    <>

    {/* General  */}
      <FormStep
        stepName='Person'
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
      >
        <Typography variant='h4' component='h5' >Person</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <InputField name='name' label='Name' />
          </Grid>
          <Grid item xs={6}>
            <InputField name='email' label='email' />
          </Grid>
          <Grid item xs={6}>
            <InputField name='email' label='email' />
          </Grid>
          <Grid item xs={6}>
            <InputField name='email' label='email' />
          </Grid>
        </Grid>
      </FormStep>


    {/* Shipper  */}
    <FormStep
        stepName='Person'
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
      >
        <Typography>Person</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <InputField name='name' label='Name' />
          </Grid>
          <Grid item xs={6}>
            <InputField name='email' label='email' />
          </Grid>
          <Grid item xs={6}>
            <InputField name='email' label='email' />
          </Grid>
          <Grid item xs={6}>
            <InputField name='email' label='email' />
          </Grid>
        </Grid>
      </FormStep>

          {/* Shipment Items  */}
          <FormStep
        stepName='Person'
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
      >
        <Typography>Person</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <InputField name='name' label='Name' />
          </Grid>
          <Grid item xs={6}>
            <InputField name='email' label='email' />
          </Grid>
          <Grid item xs={6}>
            <InputField name='email' label='email' />
          </Grid>
          <Grid item xs={6}>
            <InputField name='email' label='email' />
          </Grid>
        </Grid>
      </FormStep>


          {/* Checkout  */}
          <FormStep
        stepName='Person'
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
      >
        <Typography>Person</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <InputField name='name' label='Name' />
          </Grid>
          <Grid item xs={6}>
            <InputField name='email' label='email' />
          </Grid>
          <Grid item xs={6}>
            <InputField name='email' label='email' />
          </Grid>
          <Grid item xs={6}>
            <InputField name='email' label='email' />
          </Grid>
        </Grid>
      </FormStep>
    </>
  )
}

export default FormStep
