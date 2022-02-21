import * as yup from 'yup'
import MultiStepForm, {FormStep} from '../../../layout/forms/MultiStepForm'
import InputField from '../../../layout/forms/InputField'
import * as React from 'react'
import Box, {BoxProps} from '@mui/material/Box'
import {Grid, Typography} from '@material-ui/core'
import { spacing } from '@mui/system';
import { IrisSelectInput2 } from '../../../layout/forms/IrisSelectInput2'

function Item(props: BoxProps) {
  const {sx, ...other} = props
  return (
    <Box
      sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
        color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        padding: '42px',
        ...sx,
      }}
      {...other}
    />
  )
}

export function CaptureShipment() {

  const validationSchema = yup.object({
    name: yup.string().required('Name is Required'),
    email: yup.string().email('Email must be valid').required('Email is requied'),
  })

  return (
    <>
      <Box
        sx={{display: 'grid', bgcolor: '#fff', gridTemplateRows: 'repeat(3, 1fr)', boxShadow: 0}}
      >
        <Item>
          <MultiStepForm
            initialValues={{
              name: '',
              email: '',
              street: '',
              country: '',
              shipmenttype:'',
              wallet:''

            }}
            onSubmit={(values) => alert(JSON.stringify(values))}
          >
            {/* General Section */}
            <FormStep
              stepName='General'
              onSubmit={console.log('step1')}
              validationSchema={validationSchema}
            > 
              <Typography variant='h6' component='h5' >General Shipment Information</Typography>
              <Grid container spacing={2}  >
                <Grid item xs={6}>
                  <InputField name='waybil' label='waybill' />
                </Grid>
                <Grid item xs={6}>
                  {/* <InputField name='shipmenttype' label='Shipment Type' /> */}
                  <IrisSelectInput2 name='shipmenttype' label={'Shipment Type'} />
                </Grid>
                <Grid item xs={6}>
                  <InputField name='name' label='Name' />
                </Grid>
                <Grid item xs={6}>
                  <InputField name='email' label='email' />
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
        </Item>
      </Box>
    </>
  )
}
