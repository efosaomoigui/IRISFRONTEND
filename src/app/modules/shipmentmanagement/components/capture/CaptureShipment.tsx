import * as yup from 'yup'
import MultiStepForm, {FormStep} from '../../../layout/forms/MultiStepForm'
import InputField from '../../../layout/forms/InputField'
import * as React from 'react'
import Box from '@mui/material/Box'
import {Grid, Typography} from '@material-ui/core'
import {IrisSelectInput2} from '../../../layout/forms/IrisSelectInput2'
import useStyles from './CaptureStyles'


export function CaptureShipment() {
  const validationSchema = yup.object({
    name: yup.string().required('Full Name is Required'),
    email: yup.string().email('Email must be valid').required('Email is requied'),
    shipmenttype: yup.string().required('Shipment Type is Required'),
    departure: yup.string().required('Deaprture is Required'),
    destination: yup.string().required('Destination is Required'),
    waybill: yup.string().required('Waybill is Required'),
  })

  const classes = useStyles();

  return (
    <>
          <MultiStepForm
            initialValues={{
              name: '',
              email: '',
              shipmenttype: '',
              waybill: '',
              departure: '',
              destination: '',
            }}
            
            onSubmit={(values) => alert(JSON.stringify(values))}
          >
            {/* General Section */}
            <FormStep
              stepName='General'
              onSubmit={console.log('step1')}
              validationSchema={validationSchema}
              // sx={{margingTop: 12}}
            >
              <Grid container className={classes.container}>
                <Typography variant='h6' component='h5'>
                  General Shipment Information
                </Typography>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <InputField name='waybil' label='waybill' />
                </Grid>
                <Grid item xs={6}>
                  {/* <InputField name='shipmenttype' label='Shipment Type' /> */}
                  {/* <IrisSelectInput2 name='shipmenttype' label={'Shipment Type'} /> */}
                </Grid>
                <Grid item xs={6}>
                  {/* <IrisSelectInput2 name='departure' label={'Departure'} />{' '} */}
                </Grid>{' '}
                <Grid item xs={6}>
                  {/* <IrisSelectInput2 name='departure' label={'Destination'} />{' '} */}
                </Grid>
              </Grid>
            </FormStep>

            {/* Shippers Information */}
            <FormStep
              stepName='Shipper Information'
              onSubmit={console.log('Step 2')}
              validationSchema={yup.object({
                street: yup.string().required('Country is Required'),
                country: yup.string().required('Country is Required'),
              })}
            >
              <Box sx={{width: 400}}>
                <InputField name='street' label='Street' />
                <InputField name='country' label='Country' />
              </Box>
            </FormStep>

            {/* Shipment Items */}
            <FormStep
              stepName='Shipment Items'
              onSubmit={console.log('step1')}
              validationSchema={validationSchema}
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

            {/* Check Out */}

            <FormStep
              stepName='Check Out'
              onSubmit={console.log('step1')}
              validationSchema={validationSchema}
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
          </MultiStepForm>
    </>
  )
}
